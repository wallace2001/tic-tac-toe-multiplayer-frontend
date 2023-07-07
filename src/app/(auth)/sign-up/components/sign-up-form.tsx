"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
    name: z.string().min(3),
})

export type SchemaForm = z.infer<typeof schema>
const SignUpForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<SchemaForm>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] flex items-center">
            <div className="w-full flex flex-col gap-4">
                <Heading
                    title="Bem vindo ao Tik tak toe"
                    subtitle="Insira seu nome para começar"
                />
                <Input
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    errors={errors}
                    required
                />
                <Button
                    label="Pronto"
                    outline
                    className="w-[200px]"
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}

export default SignUpForm;