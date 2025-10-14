# /docs/docs-api/bytedance/bytedance-seedream-v4

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedream-v4

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedream V4

# Bytedance Seedream V4

Bytedance Seedream V4

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedream-v4)

Seedream 4.0 is a state-of-art image model by Bytedance. Seedream 4.0: Surpassing Nano Banana in every aspect.

## Features[](#features)

# bytedance/seedream-v4 (T2I)

A text-to-image model optimized for **multi-panel/tiled posters**, **concept designs with copy**, **series KV**, and **social media assets**. It excels at **grid-based layouts**, **whitespace planning**, and **type readability**.

## Model Highlights[](#model-highlights)

*   **Layout-aware:** Grids (2×2, triptych, comics), keeps whitespace/safe areas for title/subtitle/CTA.
*   **Consistent series:** Unified palette, lighting, and camera across panels/KV.
*   **High fidelity:** Strong identity/detail retention; clean edges, fewer artifacts.
*   **High-res:** 2K default; custom ratios; up to **4096×4096**.

## Price[](#price)

Only **$0.027** for one run!!!

## Copy-ready Templates[](#copy-ready-templates)

### 2×2 Grid Poster[](#22-grid-poster)

_2×2 grid poster, clean margins for typography; title top-center: “{TITLE}”; subtitle: “{SUBTITLE}”. Panel 1: {SCENE\_A}; Panel 2: {SCENE\_B}; Panel 3: {SCENE\_C}; Panel 4: {SCENE\_D}. Consistent color grading, cinematic lighting, brand color {BRAND\_COLOR}, high-legibility background, minimal clutter._

### Triptych (Horizontal)[](#triptych-horizontal)

_Horizontal triptych, left-to-right narrative: {SCENE\_A} → {SCENE\_B} → {SCENE\_C}. Unified palette {BRAND\_COLOR}, soft vignette, clear gutters, strong typographic hierarchy, reserved space for CTA: “{CTA}”._

### Comic (4-Panel Strip)[](#comic-4-panel-strip)

_4-panel comic layout with speech-bubble placeholders. Panel 1: {SCENE\_A}; Panel 2: {SCENE\_B}; Panel 3: {SCENE\_C}; Panel 4: {SCENE\_D}. Bold line art, flat shading, clear gutters, high readability._

### Minimalist Poster[](#minimalist-poster)

_Minimalist poster; large centered title: “{TITLE}”; small subtitle below: “{SUBTITLE}”. Single focal object: {OBJECT}. Monochrome + accent {BRAND\_COLOR}. High-legibility background; strict grid; generous whitespace._

## How to Use[](#how-to-use)

1.  **Enter your prompt:** Describe the subject, layout, text placement (title/subtitle/CTA), and style.
    
2.  **Set size:** Choose width/height. **Maximum:** **4096×4096**.
    
3.  **Run:** Click **Run** to generate. If needed, tweak the prompt or size and run again.
    

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedream-v4" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "2048*2048",
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

[Bytedance Seedream V3.1](/docs/docs-api/bytedance/bytedance-seedream-v3.1 "Bytedance Seedream V3.1")[Bytedance Seedream V4 Edit](/docs/docs-api/bytedance/bytedance-seedream-v4-edit "Bytedance Seedream V4 Edit")