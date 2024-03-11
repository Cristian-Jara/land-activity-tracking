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
      <Card className="w-[400px]">
        <CardBody className="flex py-10 px-6">
          <Input
            isClearable
            isRequired
            value={email}
            onValueChange={setEmail}
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-full"
          />
          <Spacer y={6} />
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
            className="w-full"
          />
          <Spacer y={10} />
          <Divider />
          <Spacer y={6} />
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
