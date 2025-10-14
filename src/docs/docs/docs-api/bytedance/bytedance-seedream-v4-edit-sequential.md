# /docs/docs-api/bytedance/bytedance-seedream-v4-edit-sequential

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedream-v4-edit-sequential

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedream V4 Edit Sequential

# Bytedance Seedream V4 Edit Sequential

Bytedance Seedream V4 Edit Sequential

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedream-v4/edit-sequential)

Seedream 4.0, Image Generation with 4K Resolution · Editing · Character & Object Consistency · Multi-Image Generation in Sequence. Price = unit\_price \* max\_images

## Features[](#features)

# bytedance/seedream-v4/edit-sequential

## What is it?[](#what-is-it)

**Seedream v4 Edit Sequential** is ByteDance’s **image-to-image** model for **editing** a source image and generating a **sequence/group** of consistent outputs in one pass. It’s built for high **feature retention** (identity, logos, layout) and cross-image **style continuity**—ideal for matched sets, story panels, or product variants.

## What makes it stand out?[](#what-makes-it-stand-out)

*   **I2I + sequential in one pipeline** – Edit a single source and produce **N** coherent images (series/panels) without switching models.
*   **Five core strengths** – Precise instruction editing, high feature retention, deep scene understanding, ultra-fast inference, ultra-high-res output.
*   **Consistency controls** – Strong identity/style preservation across all images in the set.
*   **Rich edit ops** – Add/remove elements, attribute/style change, structural tweaks (e.g., pose/face swap), texture/brush/frame edits.

## Designed for[](#designed-for)

*   **Commercial design** — Posters, apparel, packaging, e-commerce sets; fast, brand-safe varianting.
*   **Entertainment IP** — Character look-dev, key art sequences with locked identity.
*   **Fine art & Illustration** — Multi-piece series with coherent palette and linework.
*   **Architecture** — Material/lighting variations across consistent viewpoints.
*   **Brand content** — Campaign sets and social carousels with fixed logo/palette.

## How to use[](#how-to-use)

1.  **Inputs:** Upload several **source images**.
2.  **Prompt:** Write the instruction and **repeat the same N** in text (e.g., “a series of **N** images / Panels **1–N**”) to lock count & continuity.
3.  **Count:** Set **max\_images = N** for the number of images.
4.  **Control the size:** the max size is **4096 \* 4096**.
5.  **Generate → review → iterate** (reuse or change **seed** for A/B).

**Please Note**: Declare the number of images **twice** — **max\_images = N** and **inside the prompt**!

## Price[](#price)

*   **$0.027** per image.
*   Total price = max\_images \* $0.027

## Prompting guide[](#prompting-guide)

*   **Edit instruction (per set)** Replace \[object A\] with \[object B\]; keep \[logo/identity/features\]; preserve \[lighting/style\].
    
*   **Sequential consistency (count locked)** Generate a series of \[N\] edited images (Panels 1–\[N\]) from the source, maintaining the same \[character/product/logo\] identity, palette, and composition style.
    
    _Panel 1_ — \[edit/shot\] _Panel 2_ — \[edit/shot\] … _Panel N_ — \[edit/shot\]
    
*   **Terminology** Use precise, domain-native terms (photography, fashion, architecture) to match expectations.
    

## Example (product variant set, N=4)[](#example-product-variant-set-n4)

Set **max\_images = 4** and use:

Generate a series of 4 edited images (Panels 1–4) from the source photo, keeping the same shoe model and logo placement. Maintain identical angle, lighting, and background; change only the colorway per panel:

_Panel 1_ — classic white + black swoosh

_Panel 2_ — navy + gold accents

_Panel 3_ — matte red + white outsole

_Panel 4_ — forest green + gum sole

Ensure consistent proportions, stitching detail, and material texture across all 4 panels.

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedream-v4/edit-sequential" \
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

images

array

No

\[\]

\-

The images to edit. A maximum of 10 reference images can be uploaded.

size

string

No

2048\*2048

1024 ~ 4096 per dimension

The size of the generated media in pixels (width\*height).

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

[Bytedance Seedream V4 Edit](/docs/docs-api/bytedance/bytedance-seedream-v4-edit "Bytedance Seedream V4 Edit")[Bytedance Seedream V4 Sequential](/docs/docs-api/bytedance/bytedance-seedream-v4-sequential "Bytedance Seedream V4 Sequential")