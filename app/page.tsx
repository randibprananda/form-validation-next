"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Input = z.infer<typeof registerSchema>;

const Page = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      studentId: "",
      year: "",
    },
  });

  const onSubmit = (data: Input) => {
    // Validation Confirm Password
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    alert(JSON.stringify(data, null, 4));
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();

    // Validation Input Step 0
    form.trigger(["name", "email", "year", "studentId"]);
    const nameState = form.getFieldState("name");
    const emailState = form.getFieldState("email");
    const yearState = form.getFieldState("year");
    const studentIdState = form.getFieldState("studentId");

    if (!nameState.isDirty || nameState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;
    if (!yearState.isDirty || yearState.invalid) return;
    if (!studentIdState.isDirty || studentIdState.invalid) return;

    setFormStep(1);
  };

  const handlePrevStep = (e: FormEvent) => {
    e.preventDefault();
    setFormStep(0);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Start the journey with us today.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 relative overflow-x-hidden">
            <motion.div
              className={cn("space-y-4")}
              // formStep == 0 -> translateX == 0
              // formStep == 1 -> translateX == '-100%'
              animate={{
                translateX: `-${formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}>
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Student Id */}
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your student id..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of study</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[10, 11, 12].map((year) => {
                          return (
                            <SelectItem
                              key={year}
                              value={year.toString()}>
                              Year {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn("space-y-4 absolute top-0 right-0 left-0")}
              // formStep == 0 -> translateX == 100%
              // formStep == 1 -> translateX == 0
              animate={{
                translateX: `${100 - formStep * 100}%`,
              }}
              style={{
                translateX: `${100 - formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}>
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please confirm your password..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevStep}
                className={cn({ hidden: formStep == 0 })}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button
                type="submit"
                className={cn({ hidden: formStep == 0 })}>
                Submit
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleNextStep}
                className={cn({ hidden: formStep == 1 })}>
                Next step
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
