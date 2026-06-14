import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
/* import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group" */

const formSchema = z.object({
  email: z
    .email()
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password cannot exceed 16 characters")
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="w-1/2 h-screen flex items-center justify-center">
      <Card className="w-full sm:max-w-md" style={{boxShadow:"none"}}>
        <CardHeader>
          <CardTitle>Create your Travel Album account</CardTitle>
          {/* <CardTitle>Sign in to your Travel Album</CardTitle> */}
        </CardHeader>
        <CardContent>
          <form id="form-auth" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-auth-email">
                      Email address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-auth-email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-auth-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-auth-password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <FieldDescription>
                      <ul className="list-disc pl-5">
                        <li>Password must be between 8 and 16 characters long</li>
                        <li>Password must contain at least one uppercase letter, one lowercase letter, one number and one special character</li>
                      </ul>
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="vertical">
            {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button> */}
            <Button type="submit" form="form-auth" size = "lg">
              Sign in
            </Button>
           {/*  <Button variant = "link" size = "default">
              Forgot password?
            </Button> */}
            <div>
              <span>Already have an account?</span>
              <Button variant = "link" size = "default">
                Login
              </Button>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
