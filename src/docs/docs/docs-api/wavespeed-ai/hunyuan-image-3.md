# /docs/docs-api/wavespeed-ai/hunyuan-image-3

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan-image-3

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan Image 3

# Hunyuan Image 3

Hunyuan Image 3

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan-image-3)

HunyuanImage-3.0 is a groundbreaking native multimodal model that unifies multimodal understanding and generation within an autoregressive framework. Our text-to-image module achieves performance comparable to or surpassing leading closed-source models.

## Features[](#features)

# Hunyuan Image 3.0

Harness the cutting-edge technology of **Hunyuan Image 3.0** to transform your written ideas into compelling visual content. This advanced model ensures visuals that not only align with your narrative but also enhance its emotional and conceptual appeal.

## What is Hunyuan Image 3.0?[](#what-is-hunyuan-image-30)

Hunyuan Image 3.0 is a state-of-the-art **text-to-image** generation model. By simply providing a written prompt, you can create high-quality images that capture the essence of your story, resonate emotionally, and elevate your creative output.

## Why it looks great[](#why-it-looks-great)

*   **Prompt-driven generation:** translates text descriptions into rich, detailed visuals.
*   **Emotional resonance:** enhances narrative impact by aligning visuals with tone and mood.
*   **Flexible sizing:** supports custom width and height up to large resolutions.
*   **Style diversity:** accommodates multiple visual aesthetics, from realism to artistic styles.
*   **Reproducibility:** use the seed parameter for consistent, repeatable results.
*   **Format choice:** export in **JPEG** and **PNG** for easy integration.

## Limits and Performance[](#limits-and-performance)

*   **Max resolution per job:** up to **2048 × 2048 pixels**
*   **Processing speed:** ~**5–10 seconds per image** (varies by complexity and queue load)
*   **Input prompt:** supports detailed, multi-line descriptions

## Pricing[](#pricing)

Every image just **$0.03**!!!

## How to Use[](#how-to-use)

1.  Write a **prompt** describing the image you want.
2.  Adjust **size** (width & height).
3.  Set a **seed** for reproducibility.
4.  Choose **output\_format**.
5.  Submit the job and download the generated image.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Be descriptive in your prompt — include mood, lighting, and style.
*   Portraits with clear attributes (face, pose, background) yield sharper results.
*   Fix the seed if you want consistent outputs across runs.
*   Use custom sizes for tailored content (e.g., vertical posters or wide banners).

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan-image-3" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "seed": -1,
    "enable_sync_mode": false,
    "enable_base64_output": false
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

size

string

No

1024\*1024

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Hunyuan Image 2.1](/docs/docs-api/wavespeed-ai/hunyuan-image-2.1 "Hunyuan Image 2.1")[Hunyuan Video Foley](/docs/docs-api/wavespeed-ai/hunyuan-video-foley "Hunyuan Video Foley")