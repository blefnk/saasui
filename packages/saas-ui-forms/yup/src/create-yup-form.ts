import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
} from '@saas-ui/forms'
import { yupFieldResolver, yupResolver } from './yup-resolver'
import { InferType } from 'yup'
import React from 'react'
import { AnyObjectSchema } from './types'
type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export type YupFormType<FieldDefs, ExtraProps = object> = <
  TSchema extends AnyObjectSchema = AnyObjectSchema,
  TContext extends object = object
>(
  props: WithFields<
    FormProps<InferType<TSchema>, TContext, TSchema>,
    FieldDefs
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement

export const createYupForm = <FieldDefs>(
  options?: CreateYupFormProps<FieldDefs>
) => {
  return createForm({
    resolver: (schema) =>
      yupResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: yupFieldResolver,
    ...options,
  }) as YupFormType<FieldDefs>
}