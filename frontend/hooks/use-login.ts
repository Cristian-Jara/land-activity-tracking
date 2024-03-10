import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuth } from "@/redux/features/authSlice";

interface LoginValues {
  email: string;
  password: string;
}

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = (values: LoginValues) => {
    login(values)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        const next = searchParams.get("next");
        if (next) {
          router.push(next);
          return;
        }
        router.push("/activities");
      });
  };

  return {
    onSubmit,
    isLoading,
  };
}
