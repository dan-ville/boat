"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormDescription,
  FormItem,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { useFieldArray, useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { ALargeSmall, TextQuote } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEM_TYPE = z.enum(["question", "comment"])

const item = z.object({
  type: ITEM_TYPE,
  content: z.string(),
})

const formSchema = z.object({
  studyName: z.string(),
  items: z.array(item),
})

export function LessonBuilder() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyName: "",
      items: [
        {
          content: "",
          type: "question",
        },
      ],
    },
  })
  const { fields: items, append } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const handleAppend = (type: z.infer<typeof ITEM_TYPE>) => () =>
    append({
      type,
      content: "",
    })

  const appendQuestion = handleAppend("question")
  const appendComment = handleAppend("comment")

  const appendControls = (
    <>
      <Button
        variant="outline"
        className="w-full border-dashed text-gray-600"
        onClick={appendQuestion}
      >
        Add question
      </Button>
      <Button
        variant="outline"
        className="w-full border-dashed text-gray-600"
        onClick={appendComment}
      >
        Add comment
      </Button>
    </>
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            className={cn("border-none text-2xl")}
            {...form.register(`studyName`)}
            placeholder="Title"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="pb-4 flex flex-col gap-3">
            {items.map((field, index) => {
              // ? Indexing/numbering the question correctly is based on how many questions, not how many items exist
              const questionsIndeces = items
                .filter((item) => item.type === "question")
                .map((item) => item.id)
              const questionIndex = questionsIndeces.indexOf(field.id)

              const description =
                field.type === "question"
                  ? `Question ${questionIndex + 1}`
                  : "Comment"
              const icon =
                field.type === "question" ? <ALargeSmall /> : <TextQuote />
              return (
                <FormItem key={field.id}>
                  <FormDescription className="flex gap-2 items-center text-md">
                    {icon} {description}
                  </FormDescription>
                  <Textarea {...form.register(`items.${index}.content`)} />
                </FormItem>
              )
            })}
          </div>
          <div className="flex gap-3">{appendControls}</div>
        </Form>
      </CardContent>
    </Card>
  )
}
