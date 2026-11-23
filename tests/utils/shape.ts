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

const NO_MINIMUM = 0
export const AT_LEAST_ONE = 1

export const nullable = (shape: Shape) => new Nullable(shape)
export const arrayOf = (shape: Shape, min = NO_MINIMUM) =>
  new ArrayOf(shape, min)

function typeName(value: unknown) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

function arrayErrors(value: unknown, shape: ArrayOf, path: string): string[] {
  if (!Array.isArray(value))
    return [`${path}: expected array, got ${typeName(value)}`]
  if (value.length < shape.min)
    return [`${path}: expected at least ${shape.min} items`]
  return value.flatMap((item, index) =>
    shapeErrors(item, shape.shape, `${path}[${index}]`)
  )
}

function objectErrors(
  value: unknown,
  shape: Record<string, Shape>,
  path: string
): string[] {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return [`${path}: expected object, got ${typeName(value)}`]
  }
  return Object.entries(shape).flatMap(([key, fieldShape]) =>
    shapeErrors(Reflect.get(value, key), fieldShape, `${path}.${key}`)
  )
}

export function shapeErrors(
  value: unknown,
  shape: Shape,
  path = '$'
): string[] {
  if (shape instanceof Nullable) {
    return value === null ? [] : shapeErrors(value, shape.shape, path)
  }
  if (shape instanceof ArrayOf) return arrayErrors(value, shape, path)
  if (typeof shape !== 'string') return objectErrors(value, shape, path)

  const actual = typeName(value)
  return actual === shape ? [] : [`${path}: expected ${shape}, got ${actual}`]
}
