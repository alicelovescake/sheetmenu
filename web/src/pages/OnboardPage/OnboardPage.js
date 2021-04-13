import { Link, routes } from '@redwoodjs/router'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'

const OnboardPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label name="name" className="label" />
        <TextField
          name="name"
          className="input"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error-message" />

        <Label name="restaurant name" className="label" />
        <TextField
          name="restaurant name"
          className="input"
          validation={{ required: true }}
        />
        <FieldError name="restaurant name" className="error-message" />

        <Submit className="button">Save</Submit>
      </Form>
    </>
  )
}

export default OnboardPage
