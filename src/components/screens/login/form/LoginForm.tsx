import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useAppDispatch } from '../../../../store/hooks/Hooks'
import { loginThunk } from '../../../../store/thunks/LoginThunk'
import { UserLogin } from '../../../../types/Types'
import Button from '../../../buttons/Button'
import FormError from './FormError'
import FormInput from './FormInput'
import { FormLabel } from './FormLabel'

const LoginForm = () => {
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: UserLogin) => dispatch(loginThunk(data))

  return (
    <View style={styles.formWrapper}>
      <>
        <FormLabel text="User name" />
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'User name is required',
            maxLength: { value: 20, message: 'User name is too long' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
        />
        <FormError text={errors.username?.message} />
      </>

      <>
        <FormLabel text="Password" />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="password"
              secureTextEntry={true}
            />
          )}
        />
        <FormError text={errors.password?.message} />
      </>
      <View style={styles.loginWrapper}>
        <Button title="Login" onPress={(e) => void handleSubmit(onSubmit)(e)} />
      </View>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  formWrapper: { rowGap: 8 },
  loginWrapper: { paddingVertical: 16 },
})
