import { useForm } from 'react-hook-form'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const UPDATE_ACCOUNT = gql`
  mutation UpdateAccountMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
    }
  }
`
const AccountSetting = () => {
  const [create, { loading }] = useMutation(UPDATE_ACCOUNT)

  const formMethods = useForm()

  const onSubmit = (data) => {
    create({ variables: { input: { name: data.userName } } })
  }
  return (
    <div>
      <h2 className="font-bold pb-10">Update Account</h2>

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

export default AccountSetting
