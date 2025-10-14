# /docs/docs-api/alibaba/alibaba-wan-2.5-text-to-image

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.5 Text To Image

# Alibaba Wan 2.5 Text To Image

Alibaba Wan 2.5 Text To Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.5/text-to-image)

Generate AI images with Alibaba WAN 2.5 text-to-image model.

## Features[](#features)

# Alibaba WAN 2.5 Text-to-Image Model

**Alibaba WAN 2.5** is a cutting-edge text-to-image model on Alibaba Cloud’s DashScope. It generates high-quality, detailed images directly from text prompts and supports multiple output resolutions.

## What makes it stand out?[](#what-makes-it-stand-out)

*   **High Fidelity:** Wan 2.5 produces crisp, detailed images that capture complex scene descriptions and artistic styles.
*   **Creative Flexibility:** From product design mockups to character art, Wan 2.5 supports diverse use cases and genres.
*   **Multiple Styles & Formats:** Choose from photo-realistic, anime, sketch, or artistic rendering modes—adaptable to your creative vision.
*   **Customizable Size:** Easily adjust width and height with simple sliders. Set the exact dimensions you need.

## Designed For[](#designed-for)

*   **Design teams:** Quick iterations on visuals, product concepts, and campaign mockups.
*   **Content creators:** Generate unique visuals for blogs, social posts, and digital branding.
*   **Storytellers & artists:** Visualize characters, scenes, and worlds from simple text prompts.
*   **Enterprises:** Efficiently produce consistent visuals across marketing, training, and documentation.

## Pricing[](#pricing)

*   Every image is just cost **$0.03!!**

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 1 image.
*   **Total cost** = number of images × price per resolution.

## How to Use[](#how-to-use)

1.  Write your prompt.
2.  Submit your request.
3.  Preview and download the generated image.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.5/text-to-image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "enable_prompt_expansion": false,
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

size

string

No

1024\*1024

768 ~ 1440 per dimension

The size of the generated image in pixels (width\*height).

enable\_prompt\_expansion

boolean

No

false

\-

If set to true, the prompt optimizer will be enabled.

negative\_prompt

string

No

\-

The negative prompt for the generation.

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

[Alibaba Wan 2.5 Image To Video Fast](/docs/docs-api/alibaba/alibaba-wan-2.5-image-to-video-fast "Alibaba Wan 2.5 Image To Video Fast")[Alibaba Wan 2.5 Text To Video](/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-video "Alibaba Wan 2.5 Text To Video")