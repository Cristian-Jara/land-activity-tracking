"use strict";
"use client";
import React from "react";
import {
  Card,
  CardBody,
  Divider,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/assets/icons";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { onSubmit, isLoading } = useLogin();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="center-container">
      <Card className="max-w-[500px]">
        <CardBody className="flex py-8 px-3">
          <Input
            isClearable
            isRequired
            value={email}
            onValueChange={setEmail}
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="max-w-xs"
          />
          <Spacer y={5} />
          <Input
            isRequired
            value={password}
            onValueChange={setPassword}
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Divider />
          <Spacer y={10} />
          <Button
            color="primary"
            onClick={() => onSubmit({ email, password })}
            isLoading={isLoading}
          >
            Login
          </Button>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
