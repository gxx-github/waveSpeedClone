# /docs/docs-api/bytedance/bytedance-seedream-v4-edit

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedream-v4-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedream V4 Edit

# Bytedance Seedream V4 Edit

Bytedance Seedream V4 Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedream-v4/edit)

Seedream 4.0 is a state-of-art image model by Bytedance. Seedream 4.0: Surpassing Nano Banana in every aspect.

## Features[](#features)

# bytedance/seedream-v4/edit

**Seedream 4.0/Edit** is a specialized image-to-image model for accurate edits to existing images - swap outfits and accessories, adjust hair or makeup, recolor or re-materialize products, and replace interior finishes like floors, walls, or furniture while maintaining subject identity, lighting, and overall composition.

## Highlights[](#highlights)

*   **High fidelity on people & products:** Reliable skin tones, fabric/material details, logos, and fine edges.
*   **Production-friendly consistency:** Generate multiple variants quickly with locked camera/look and brand color grading.
*   **Structured prompts that scale:** Works best when the goal is clear up front (action + object + target feature + constraints).

## Use cases[](#use-cases)

*   **Portrait & influencer workflows:** Outfit/makeup/hair changes, branded KV series, quick campaign variants.
*   **E-commerce & product teams:** Colorways, material/texture swaps, packaging updates.
*   **Interior/archviz:** Wall/floor finish replacements, upholstery changes, lighting-aware set dressing.
*   **Marketing & growth:** Fast A/B testing with consistent brand color and camera setup.

## Price[](#price)

Only **$0.027** per image!!!

## How to use[](#how-to-use)

1.  **Prepare source:** Upload the base images (**Up to 10 images**).
2.  **Set size:** The maximum size of the image is **4096 \* 4096**.
3.  **Write a clear prompt:** Write clearly in the prompt about object, feature, and constraints.

## Prompt patterns (copy-ready)[](#prompt-patterns-copy-ready)

Use: change action + change object + target feature + constraints (keep/avoid)

### Portrait (KV series)[](#portrait-kv-series)

_portrait KV series, {STYLE} style, consistent color grading {BRAND\_COLOR}, fixed camera look (85mm shallow depth), interchangeable persona: {PERSONA}, reserved lower-third text “{NAME} — {ROLE}”_

### Change Clothes / Jewellery / Makeup[](#change-clothes--jewellery--makeup)

_Outfit swap for portrait, replace clothing with {OUTFIT\_DESC}; keep pose and composition; accessories {JEWELRY\_DESC}; makeup/hair {MAKEUP\_HAIR}; preserve skin tone and lighting; clean edges, no artifacts_

### Background Replacement[](#background-replacement)

_Background replacement for subject, keep subject edges; new environment: {SCENE\_DESC}; match light direction and color temperature; soft contact shadows; no haloing_

### Interior / Outdoor Replacement[](#interior--outdoor-replacement)

_Interior finish swap, update wall {WALL\_MATERIAL}, floor {FLOOR\_MATERIAL}, furniture upholstery {FABRIC}; layout and lighting unchanged; realistic PBR textures_

* * *

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedream-v4/edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "2048*2048",
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

images

array

Yes

\[\]

\-

The images to edit. A maximum of 10 reference images can be uploaded.

size

string

No

2048\*2048

1024 ~ 4096 per dimension

The size of the generated media, supporting up to 4K resolution for images. If you need to match the size of an existing image, you must explicitly specify the dimensions, as automatic resizing to match the image is not supported.

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

[Bytedance Seedream V4](/docs/docs-api/bytedance/bytedance-seedream-v4 "Bytedance Seedream V4")[Bytedance Seedream V4 Edit Sequential](/docs/docs-api/bytedance/bytedance-seedream-v4-edit-sequential "Bytedance Seedream V4 Edit Sequential")