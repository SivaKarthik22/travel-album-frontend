import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import userApiServiceInstance from "@/services/UserApiService"
import { setUser, setAccessToken } from "@/store/UserSlice"
import { toast } from "sonner"

const newFormSchema = z.object({
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

const loginFormSchema = z.object({
  email: z
    .email()
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
})

export default function LoginForm({ loginMode = true }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = loginMode ? loginFormSchema : newFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (loginMode) {
        const responseData = await userApiServiceInstance.loginUser(data.email, data.password);
        dispatch(setUser(responseData.user));
        dispatch(setAccessToken(responseData.accessToken));
        form.reset();
        navigate("/");
      }
      else {
        //todo
      }
    }
    catch (error: any) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        toast.error(error.response.data.message || 'Invalid credentials', {
          position: "top-center",
          classNames: {
            toast: "bg-destructive/10",
          }
        });
      } else if (error.request) {
        // Request was made but no response was received
        toast.error('Network error. Please check your internet connection.', {
          position: "top-center",
          classNames: {
            toast: "bg-destructive/10",
          }
        });
      } else {
        // Something went wrong setting up the request
        toast.error('An unexpected error occurred', { 
          position: "top-center",
          classNames: {
            toast: "bg-destructive/10",
          }
        });
      }
      form.reset();
    }
  }

  function redirect() {
    form.reset();
    navigate(loginMode ? '/signup' : '/login');
  }

  return (
    <div className="w-1/2 h-screen flex flex-col items-center justify-center">
      <Button variant="secondary" size="default" className="px-3 mt-5 mr-5 self-end" onClick={redirect}>
        {loginMode ? "Create account" : "Sign in"}
      </Button>
      <div className="w-full flex items-center justify-center flex-1">
        <Card className="w-full sm:max-w-md text-center" style={{ boxShadow: "none" }}>
          <CardHeader>
            <CardTitle>
              {loginMode ? "Sign in to your Travel Album" : "Create your Travel Album account"}
            </CardTitle>
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
                      {!loginMode &&
                        <FieldDescription className="list-disc pl-5">
                          <li>Password must be between 8 and 16 characters long</li>
                          <li>Password must contain at least one uppercase letter, one lowercase letter, one number and one special character</li>
                        </FieldDescription>
                      }
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="vertical">
              <Button type="submit" form="form-auth" size="lg">
                {loginMode ? "Sign in" : "Create account"}
              </Button>
              {loginMode &&
                <Button variant="link" size="default">
                  Forgot password?
                </Button>
              }
              <div>
                <span>{loginMode ? "Are you a new user?" : "Already have an account?"}</span>
                <Button variant="link" size="default" onClick={redirect} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : (loginMode ? "Create account" : "Sign in")}
                </Button>
              </div>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
