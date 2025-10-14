# /docs/docs-api/wavespeed-ai/wan-2.2-video-edit

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-video-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 Video Edit

# Wan 2.2 Video Edit

Wan 2.2 Video Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/video-edit)

Edit videos with text prompt easily. Powered by Wan 2.2, our endpoint lets you modify the content of your videos as simple as possible. For example, you can use text prompts like “Change her clothing to bikini.” or “Change the woman to a handsome boy.” to modify the video directly. Our endpoint starts with $0.2 per 5 seconds (480p) or $0.4 per 5 seconds (720p) video generation and supports a maximum generation length of 120 seconds.

## Features[](#features)

# Wan 2.2 Video Edit

## What is Wan 2.2 Video Edit?[](#what-is-wan-22-video-edit)

**Wan 2.2 Video Edit** is a text-driven video editor: describe the change, and the model applies it directly to your footage. Swap identities, change outfits and props, recolor or restyle scenes, and adjust attributes—while keeping motion and continuity consistent across frames.

## Pricing[](#pricing)

Output

Price per 5s

Max Length

480p

**$0.20**

**120 s**

720p

**$0.40**

**120 s**

## Designed for[](#designed-for)

*   **Marketing & Brand** – Quick wardrobe swaps, colorway tests, and on-brand variations without reshoots.
*   **E-commerce & Fashion** – Try new styles/prints on existing clips; localize looks per market.
*   **Post/Studios** – Fast previz and pickup fixes (outfit tweaks, minor character replacements).
*   **Creators & Social Teams** – Rapid A/B ideas for thumbnails, shorts, and trend edits.

## How to Use[](#how-to-use)

1.  **Upload video** (required) – the clip you want to edit.
    
2.  **Write prompt** (required) – clear edit intent, such as:
    
    *   Change the woman’s vest to a bikini.
    *   Replace the man with a teenage boy.
    *   Turn the jacket red and add sunglasses.
3.  **Set resolution** – 480p or 720p.
    
4.  **Set seed** – use a fixed number to reproduce results.
    
5.  **Generate** – wait a moment, review, and iterate (adjust prompt or seed for variants).
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/video-edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "resolution": "480p",
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

video

string

Yes

\-

The video for generating the output.

prompt

string

Yes

\-

The positive prompt for the generation.

resolution

string

No

480p

480p, 720p

The resolution of the output video.

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

[Wan 2.2 Text To Image Realism](/docs/docs-api/wavespeed-ai/wan-2.2-text-to-image-realism "Wan 2.2 Text To Image Realism")[Wan Flf2v](/docs/docs-api/wavespeed-ai/wan-flf2v "Wan Flf2v")