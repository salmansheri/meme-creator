"use client";

import { MemeTemplateType } from "@/data/types";
import { useForm, SubmitHandler } from "react-hook-form";
import MemeDisplay from "./MemeDisplay";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { useTransition } from 'react'; 


interface FormStore {
  template: string;
  values: Record<string, string>;
}

const textValues = (template: MemeTemplateType) => {
  template.textareas.reduce((values, ta) => ({
    ...values,
    [ta.id]: ta.text,
  })),
    {} as Record<string, string>;
};

const MemeEditor = ({ templates }: { templates: MemeTemplateType[] }) => {
    const router = useRouter(); 
    const[isPending, startTransition] = useTransition(); 
  const { register, handleSubmit, watch, setValue } = useForm<FormStore>({
    defaultValues: {
      template: templates[0].id,
      // @ts-ignore
      values: textValues(templates[0]),
    },
  });

  const templateId = watch("template");
  const values = watch("values");
  const template = templates.find((template) => template.id === templateId);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormStore> = async (data) => {
    setIsLoading(true);
    await fetch("/api/memes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(() => {
        alert("successfully posted");
        startTransition(() => {
            router.refresh(); 
        })
      })
      .catch((error: any) => {
        alert("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%]">
          {/* @ts-ignore  */}
          <MemeDisplay {...template} values={values} />
          <div className="pl-2 text-white">
            <select
              className="select select-bordered select-success w-full"
              value={templateId}
              onChange={(event) => {
                const newTemplate = templates.find(
                  (template) => template.id === event.target.value
                )!;

                setValue("template", newTemplate.id);
                //@ts-ignore
                setValue("values", textValues(newTemplate));
              }}
            >
              <option disabled>Pick your template</option>
              {templates.map((template) => (
                <option
                  className="text-white"
                  key={template.id}
                  value={template.id}
                >
                  {template.id}
                </option>
              ))}
            </select>

            {template?.textareas.map((textarea, index) => (
              <div key={index} className="mt-5">
                <label className="uppercase" htmlFor={textarea.id}>
                  {textarea.id}
                </label>
                <div>
                  <input
                    className="input input-accent input-bordered w-full mt-2"
                    type="text"
                    {...register(`values.${textarea.id}`)}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="btn btn-accent mt-5 min-w-[200px]"
                type="submit"
                disabled={isPending}
              >
                {isLoading ? `Loading...` : `Lets's Go`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MemeEditor;
