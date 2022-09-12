import { Box, BoxProps } from '@primer/react'
import {Children, ReactNode, cloneElement, isValidElement, useEffect} from 'react'

import { FieldValues, Path, useForm } from 'react-hook-form'

import { Text, Date } from './field'
import { Footer } from './footer'
import {yupResolver} from "@hookform/resolvers/yup";
import {Validate} from "../../hooks/useError";

type FormProps<T> = Omit<BoxProps, 'onSubmit' | 'children'> & {
  children: ReactNode
  defaultValues?: any
  schema?: any
  onSubmit: (data: T) => void
  fieldErrors?: Validate[]
}

function Form<T extends FieldValues>({
  schema,
  children,
  onSubmit,
  fieldErrors,
  defaultValues,
  ...rest
}: FormProps<T>) {
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({ defaultValues, resolver: yupResolver(schema) })

  useEffect(() => {
    if (!fieldErrors || fieldErrors.length === 0) return

    fieldErrors.forEach(error => {
      setError(error.field as Path<T>, { message: error.message })
    })
  }, [fieldErrors])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ "> *": { mt: 2 } }} {...rest}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child
          }

          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (child.props.name) {
            return cloneElement(child, {
              ...child.props,
              error: errors[child.props.name],
              ...register(child.props.name),
              key: child.props.name,
            })
          }

          if (child.props.type === 'submit') {
            return cloneElement(child, {
              ...child.props,
              isLoading: isSubmitting,
            })
          }

          if ((child.type as any).displayName === 'Footer') {
            return cloneElement(child, {
              ...child.props,
              isLoading: isSubmitting,
            })
          }

          return child
        })}
      </Box>
    </form>
  )
}

Form.Text = Text
Form.Date = Date
Form.Footer = Footer

export default Form
