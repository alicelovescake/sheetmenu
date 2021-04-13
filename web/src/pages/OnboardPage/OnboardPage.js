import { navigate, routes } from '@redwoodjs/router'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'

const OnboardPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="mb-4 space-y-4 p-6">
        <h1 className="font-bold text-2xl">Welcome!</h1>

        <p>
          Thanks for joining sheetmenu! We&apos;ll help you get a website up and
          running in under five minutes.
        </p>

        <p>
          First, we just need a little bit of info about you and your
          restaurant.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="bg-white p-6 rounded-lg space-y-4">
        <div>
          <Label name="name" className="font-bold pr-2 text-sm">
            Name
          </Label>
          <TextField
            name="name"
            className="bg-gray-100 p-2 rounded-lg block w-full"
            validation={{ required: true }}
          />
          <FieldError name="name" className="error-message" />
        </div>

        <div>
          <Label name="restaurantName" className="font-bold pr-2 text-sm">
            Restaurant Name
          </Label>
          <TextField
            name="restaurantName"
            className="bg-gray-100 p-2 rounded-lg block w-full"
            validation={{ required: true }}
          />
          <FieldError name="restaurantName" className="error-message" />
        </div>

        <Submit className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75">
          Save
        </Submit>
      </Form>
    </main>
  )
}

export default OnboardPage
