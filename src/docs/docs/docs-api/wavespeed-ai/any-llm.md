# /docs/docs-api/wavespeed-ai/any-llm

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/any-llm

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")Wavespeed AIAny Llm

# Any Llm

Any Llm

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/any-llm)

A large language model (LLM) is a type of machine learning model built to handle natural language processing tasks, including language generation, understanding, and more. Dive into the fascinating world of Large Language Models.

## Features[](#features)

A large language model (LLM) (LLM) is a type of machine learning model built to handle natural language processing tasks, including language generation, understanding, and more. Dive into the fascinating world of Large Language Models.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/any-llm" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "reasoning": false,
    "priority": "latency",
    "model": "google/gemini-flash-1.5",
    "enable_sync_mode": false
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

prompt

string

Yes

\-

The positive prompt for the generation.

system\_prompt

string

No

\-

\-

System prompt to provide context or instructions to the model

reasoning

boolean

No

false

\-

Should reasoning be the part of the final answer.

priority

string

No

latency

throughput, latency

Throughput is the default and is recommended for most use cases. Latency is recommended for use cases where low latency is important.

temperature

number

No

\-

0 ~ 2

This setting influences the variety in the model’s responses. Lower values lead to more predictable and typical responses, while higher values encourage more diverse and less common responses. At 0, the model always gives the same response for a given input.

max\_tokens

integer

No

\-

\-

This sets the upper limit for the number of tokens the model can generate in response. It won’t produce more than this limit. The maximum value is the context length minus the prompt length.

model

string

No

google/gemini-flash-1.5

deepseek/deepseek-r1, anthropic/claude-3.7-sonnet, anthropic/claude-3.5-sonnet, anthropic/claude-3-5-haiku, anthropic/claude-3-haiku, meta-llama/llama-3.2-1b-instruct, meta-llama/llama-3.2-3b-instruct, meta-llama/llama-3.1-8b-instruct, meta-llama/llama-3.1-70b-instruct, openai/gpt-oss-120b, openai/gpt-4o-mini, openai/gpt-4o, openai/gpt-4.1, openai/o3, openai/gpt-5-chat, openai/gpt-5-mini, openai/gpt-5-nano, meta-llama/llama-4-maverick, meta-llama/llama-4-scout

Name of the model to use. Premium models are charged at 10x the rate of standard models, they include: deepseek/deepseek-r1, google/gemini-pro-1.5, openai/gpt-4.1, anthropic/claude-3-5-haiku, openai/gpt-4o, anthropic/claude-3.5-sonnet, openai/o3, meta-llama/llama-3.2-90b-vision-instruct, anthropic/claude-3.7-sonnet, openai/gpt-5-chat.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Kwaivgi Kling V2.5 Turbo Pro Text To Video](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-text-to-video "Kwaivgi Kling V2.5 Turbo Pro Text To Video")[Any Llm Vision](/docs/docs-api/wavespeed-ai/any-llm-vision "Any Llm Vision")