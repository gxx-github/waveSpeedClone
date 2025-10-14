# /docs/docs-api/wavespeed-ai/lynx

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/lynx

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Lynx

# Lynx

Lynx

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/lynx)

Effortlessly create subject-consistent videos with Lynx by ByteDance, a cutting-edge tool designed to maintain visual consistency across frames. Whether you’re crafting dynamic animations or seamless video content, Lynx ensures your subject stays true to form, delivering professional-quality results with ease!

## Features[](#features)

# ByteDance Lynx

Easily create **subject-consistent videos** with **Lynx by ByteDance**, an advanced image-to-video model designed to keep a stable visual appearance across frames. Whether you’re making dynamic animations or smooth video content, Lynx ensures your subject stays consistent, delivering professional-quality results effortlessly.

## Why it looks great[](#why-it-looks-great)

*   **Subject consistency:** preserves the identity, appearance, and details of the subject across all frames.
*   **Smooth motion:** generates fluid, natural-looking animations without jitter.
*   **Flexible aspect ratios:** supports **16:9**, **9:16**, and **1:1** for versatile use cases.
*   **Prompt control:** guide motion, style, and atmosphere with descriptive text.
*   **Image-driven video:** start from any uploaded image and transform it into a short video clip.

## Limits and Performance[](#limits-and-performance)

*   **Output resolution:** depends on chosen aspect ratio (16:9, 9:16, or 1:1).
*   **Max clip length per job:** **5 seconds**
*   **Processing speed:** ~**5–12 seconds of wall time per 1 second of video** (varies by queue and complexity)

## Pricing[](#pricing)

Each run costs just **$0.5**!!!

## Billing Rules[](#billing-rules)

*   Flat rate: **$0.50 per generation**
*   Each run produces a **5-second clip**

## How to Use[](#how-to-use)

1.  Write a **prompt** to describe the motion, scene, or style.
2.  Upload an **image** as the subject reference (**JPG** or **PNG**).
3.  Choose the **aspect\_ratio**: **16:9**, **9:16**, or **1:1**.
4.  Submit the job.
5.  Download your generated **5-second video**.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Use high-resolution, clear source images for stronger subject consistency.
*   Be specific in your prompts (e.g., “walking forward in a forest with cinematic lighting”).
*   Choose the aspect ratio according to your target platform (e.g., **9:16** for TikTok, **16:9** for YouTube).

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/lynx" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9"
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

image

string

Yes

\-

The image for generating the output.

aspect\_ratio

string

No

16:9

16:9, 9:16, 1:1

The aspect ratio of the generated media.

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

[Ltx Video V097 I2V 720p](/docs/docs-api/wavespeed-ai/ltx-video-v097-i2v-720p "Ltx Video V097 I2V 720p")[Magi 1 24b](/docs/docs-api/wavespeed-ai/magi-1-24b "Magi 1 24b")