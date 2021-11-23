import { useForm } from 'react-hook-form'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { Toaster } from '@redwoodjs/web/toast'

const AccountSettings = ({ update, loading, data }) => {
  const formMethods = useForm()

  const onSubmit = (data) => {
    update({ variables: { input: { name: data.userName } } })
  }

  return (
    <div>
      <h2 className="font-bold pb-10 pl-2 text-2xl">Account Settings</h2>
      <Toaster />
      <Form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg space-y-4"
        formMethods={formMethods}
      >
        <div>
          <Label name="userName" className="font-bold pr-2 text-sm">
            Name
          </Label>
          <TextField
            name="userName"
            defaultValue={data?.user.name}
            className="bg-gray-100 p-2 rounded-lg block w-full"
            validation={{ required: true }}
          />
          <FieldError name="userName" className="error-message" />
        </div>

        <Submit
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          disabled={loading}
        >
          Save
        </Submit>
      </Form>
    </div>
  )
}

export default AccountSettings
