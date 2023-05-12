import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAppDispatch } from '../../../../store/hooks/Hooks'
import { authorize, set_name } from '../../../../store/slices/UserSlice'

type FormData = {
  userName: string
  password: string
}

const LoginForm = () => {
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const onSubmit = useCallback(
    (data: FormData) => {
      console.log(data)
      dispatch(authorize())
      dispatch(set_name(data.userName))
    },
    [dispatch],
  )

  return (
    <View style={styles.containerView}>
      <View style={styles.controlView}>
        <Text style={styles.labelText}>User name</Text>
        <Controller
          control={control}
          rules={{
            required: 'User name is required',
            maxLength: { value: 20, message: 'User name is too long' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        <Text style={styles.errorText}>
          {errors.userName && errors.userName.message}
        </Text>
      </View>

      <View style={styles.controlView}>
        <Text style={styles.labelText}>Password</Text>
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="password"
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        <Text style={styles.errorText}>
          {errors.password && errors.password.message}
        </Text>
      </View>

      <View style={styles.buttonView}>
        <Pressable
          onPress={(e) => void handleSubmit(onSubmit)(e)}
          android_ripple={{ color: 'rgba(125, 140, 1, 0.7)', borderless: true }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  buttonView: {
    height: 40,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 3,
  },
  loginButton: {
    height: 40,
    backgroundColor: 'rgb(186 208 3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  containerView: { rowGap: 8, paddingHorizontal: 16, paddingBottom: 16 },
  controlView: {},
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'white',
    height: 36,
    borderRadius: 20,
    marginVertical: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  labelText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
