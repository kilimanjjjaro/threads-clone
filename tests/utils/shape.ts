// A tiny structural validator for the api contract tests. zod is not used
// because a root install makes qwik-city bundle it instead of its own zod 3.

type Primitive = 'string' | 'number' | 'boolean' | 'object'

class Nullable {
  constructor(readonly shape: Shape) {}
}

class ArrayOf {
  constructor(
    readonly shape: Shape,
    readonly min: number
  ) {}
}

export type Shape =
  | Primitive
  | Nullable
  | ArrayOf
  | { readonly [key: string]: Shape }

export const nullable = (shape: Shape) => new Nullable(shape)
export const arrayOf = (shape: Shape, min = 0) => new ArrayOf(shape, min)

function typeName(value: unknown) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

export function shapeErrors(
  value: unknown,
  shape: Shape,
  path = '$'
): string[] {
  if (shape instanceof Nullable) {
    return value === null ? [] : shapeErrors(value, shape.shape, path)
  }

  if (shape instanceof ArrayOf) {
    if (!Array.isArray(value))
      return [`${path}: expected array, got ${typeName(value)}`]
    if (value.length < shape.min)
      return [`${path}: expected at least ${shape.min} items`]
    return value.flatMap((item, index) =>
      shapeErrors(item, shape.shape, `${path}[${index}]`)
    )
  }

  const actual = typeName(value)

  if (typeof shape === 'string') {
    return actual === shape ? [] : [`${path}: expected ${shape}, got ${actual}`]
  }

  if (actual !== 'object') return [`${path}: expected object, got ${actual}`]

  return Object.entries(shape).flatMap(([key, fieldShape]) =>
    shapeErrors(
      (value as Record<string, unknown>)[key],
      fieldShape,
      `${path}.${key}`
    )
  )
}
