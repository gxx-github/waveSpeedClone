# /docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p-ultra-fast

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p-ultra-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 T2V 480p Ultra Fast

# Wan 2.2 T2V 480p Ultra Fast

Wan 2.2 T2V 480p Ultra Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/t2v-480p-ultra-fast)

Generate unlimited AI videos with Wan 2.2 text to video model.

## Features[](#features)

# Wan 2.2 t2v-480p-ultra-fast

Unleash the power of **Wan 2.2**, a next-generation multimodal generative model from WAN AI. Built with an innovative **Mixture of Experts (MoE)** architecture, it combines **high-noise** and **low-noise** expert models across denoising timesteps to deliver **cinematic-quality video content**.

## Why it looks great[](#why-it-looks-great)

*   **Cinematic-level aesthetic control:** integrates professional film industry standards, with multi-dimensional control over **lighting, color, and composition**.
*   **Large-scale complex motion:** smoothly restores diverse, complex movements with enhanced **naturalness and controllability**.
*   **Precise semantic compliance:** excels at **complex scene understanding** and **multi-object generation**, ensuring your creative intentions are faithfully realized.

## Pricing[](#pricing)

Per-second billing with a **5-second minimum**.

Output time

Cost

5s

$0.05

8s

$0.08

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Total cost** = billed duration × per-second rate

## How to Use[](#how-to-use)

2.  Provide a **prompt** .
3.  Set desired **size** (832 \* 480 or 480 \* 832).
4.  Submit the job and wait for rendering.
5.  Preview and download your cinematic video.
6.  Use **seed** to generate new style or review.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Write detailed prompts: include **mood, motion, scene details, and style**.
*   Use input for stronger subject consistency.
*   Keep video length manageable for faster turnaround.
*   For storytelling, chain multiple clips and merge them externally.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/t2v-480p-ultra-fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "832*480",
    "duration": 5,
    "seed": -1
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

negative\_prompt

string

No

\-

The negative prompt for the generation.

size

string

No

832\*480

832\*480, 480\*832

The size of the generated media in pixels (width\*height).

duration

integer

No

5

5, 8

The duration of the generated media in seconds.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

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

[Wan 2.2 T2V 480p LoRA Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p-lora-ultra-fast "Wan 2.2 T2V 480p LoRA Ultra Fast")[Wan 2.2 T2V 5b 720p](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-5b-720p "Wan 2.2 T2V 5b 720p")