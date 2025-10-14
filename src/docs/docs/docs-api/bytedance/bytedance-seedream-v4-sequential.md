# /docs/docs-api/bytedance/bytedance-seedream-v4-sequential

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedream-v4-sequential

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedream V4 Sequential

# Bytedance Seedream V4 Sequential

Bytedance Seedream V4 Sequential

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedream-v4/sequential)

Seedream 4.0, Image Generation with 4K Resolution · Editing · Character & Object Consistency · Multi-Image Generation in Sequence. Price = unit\_price \* max\_images

## Features[](#features)

# bytedance/seedream-v4/sequential

## What is it?[](#what-is-it)

**Seedream v4 sequential** is ByteDance’s SOTA image model that use for **sequential/group generation** in one pipeline—built for cross-image consistency and rapid iteration.

## Why choose Seedream?[](#why-choose-seedream)

*   **All-in-one, multi-modal**: T2I, edit, and multi-image sets without switching models.
*   **Five strengths**: precise instruction editing, high feature retention, deep understanding, ultra-fast inference, ultra-high-res output.
*   **Speed**: as little as **~1.8 s for a 2K image** (T2I).
*   **Powerful edits**: add/remove objects, attribute & style changes, structural ops (e.g., face swap), texture/brush/frame edits.
*   **Sequential consistency**: maintains identity, palette, and layout across a set/series.

## Designed for[](#designed-for)

*   **Commercial design** — Posters, apparel, packaging, e-commerce visuals; fast varianting and brand-safe edits.
*   **Entertainment IP** — Anime/film characters; style-consistent key art, poses, and look dev.
*   **Art creation** — High-res illustration, stylistic explorations, and series with coherent aesthetics.
*   **Architecture** — Concept renders, façade studies, material/lighting variations across sets.
*   **Brand content** — Campaign assets and social creatives with locked palette, logo, and identity.

## How to use[](#how-to-use)

1.  **Write prompt**: action + object + target feature. For sets add “a series of N images” and style locks.
2.  **Set the parameter**: size, max\_images.

## Price[](#price)

*   **$0.027** per image.
*   Total price = **max\_images** \* $0.027

## Prompt Examples[](#prompt-examples)

*   **Instruction edit**: `Replace [A] with [B]; keep [lighting/style]; preserve [logo/identity].`
*   **T2I coherent**: `A [subject] in [scene/time/weather], [camera/lens], [lighting], [style]; key props [X]; composition [framing].`
*   **Sequential set**: `Generate a series of [N] images of [subject/brand] in [scenario]; keep consistent [palette/logo/identity]; vary [poses/angles/backgrounds].`

## Note[](#note)

Please set the **max\_image** first, and then input **how many images** you want to generate in prompt! Such as:

*   max\_image = 4.
*   Prompt: I want to generate 4 images… + (your prompt)

## Recommended Resolutions[](#recommended-resolutions)

Aspect Ratio

Exact (W×H)

Exact Pixels

Rounded (W×H, ÷64)

Rounded Pixels

1:1

1448 × 1448

2,096,704

1408 × 1408

1,982,464

3:2

1773 × 1182

2,095,686

1728 × 1152

1,990,656

4:3

1672 × 1254

2,096,688

1664 × 1216

2,023,424

16:9

1936 × 1089

2,108,304

1920 × 1088

2,088,960

21:9

2212 × 948

2,096,976

2176 × 960

2,088,960

1:1

1024 × 1024

1,048,576

1024 × 1024

1,048,576

3:2

1254 × 836

1,048,344

1216 × 832

1,011,712

4:3

1182 × 887

1,048,434

1152 × 896

1,032,192

16:9

1365 × 768

1,048,320

1344 × 768

1,032,192

21:9

1564 × 670

1,047,880

1536 × 640

983,040

1:1

323 × 323

104,329

320 × 320

102,400

3:2

397 × 264

104,808

384 × 256

98,304

4:3

374 × 280

104,720

448 × 320

143,360

16:9

432 × 243

104,976

448 × 256

114,688

21:9

495 × 212

104,940

576 × 256

147,456

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedream-v4/sequential" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "2048*2048",
    "max_images": 1,
    "enable_base64_output": false,
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

size

string

No

2048\*2048

1024 ~ 4096 per dimension

The size of the generated media, supporting up to 4K resolution for images. If you need to match the size of an existing image, you must explicitly specify the dimensions, as automatic resizing to match the image is not supported.

max\_images

integer

No

1

1 ~ 15

The maximum number of images that can be generated (up to 15). This value must align with the number of images specified in the prompt above.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Bytedance Seedream V4 Edit Sequential](/docs/docs-api/bytedance/bytedance-seedream-v4-edit-sequential "Bytedance Seedream V4 Edit Sequential")[Bytedance Uso](/docs/docs-api/bytedance/bytedance-uso "Bytedance Uso")