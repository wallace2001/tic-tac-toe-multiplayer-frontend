"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation";

import useGame from "@/hooks/use-game";

const schema = z.object({
    name: z.string().min(3),
    roomJoined: z.string().min(1),
})

export type SchemaForm = z.infer<typeof schema>
const SignUpForm = () => {
    const addUser = useGame((state) => state.addUser);
    const connectSocket = useGame((state) => state.connectSocket);
    const user = useGame((state) => state.user);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<SchemaForm>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<SchemaForm> = async (data) => {

        connectSocket();

        addUser({
            name: data.name,
            roomJoined: data.roomJoined
        });
        router.push('/');
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
                    label="Nome"
                    register={register('name', { required: true })}
                    errors={errors}
                    required
                />
                <Input
                    id="roomJoined"
                    label="Nome da sala"
                    register={register('roomJoined', { required: true })}
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