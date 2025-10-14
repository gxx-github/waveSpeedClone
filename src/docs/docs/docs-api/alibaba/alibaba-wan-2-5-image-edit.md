# /docs/docs-api/alibaba/alibaba-wan-2.5-image-edit

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.5-image-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.5 Image Edit

# Alibaba Wan 2.5 Image Edit

Alibaba Wan 2.5 Image Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.5/image-edit)

Refine existing visuals using Alibaba WAN 2.5 image-edit for prompt-driven adjustments and stylistic upgrades.

## Features[](#features)

# Alibaba WAN 2.5 Image Edit

**Alibaba WAN 2.5 Image Edit** enables you to upload an existing visual and specify the desired adjustments. The model preserves layout and subject structure while implementing high-quality updates based on natural language.

## Why creators love it[](#why-creators-love-it)

*   **Structure-preserving edits:** Make lighting, color, or object changes without breaking composition.
*   **Text-guided styling:** Reimagine materials, moods, or art styles with concise prompts.
*   **Prompt expansion on demand:** Enable automatic prompt enrichment when you need extra detail.
*   **Flexible output sizes:** Pick the resolution that best matches your downstream workflow.

## Perfect for[](#perfect-for)

*   Marketing and design teams refining campaign visuals.
*   E-commerce sellers upgrading product imagery.
*   Content creators polishing thumbnails, covers, and posts.
*   Artists experimenting with variations of their original work.

## Pricing[](#pricing)

*   Every edit is just **$0.03**!!!

### Billing rules[](#billing-rules)

*   Minimum charge: 1 image.
*   Total cost = number of images × price per resolution.

## How to use[](#how-to-use)

1.  Provide the image you want to refine. (Image dimensions must be in **(384, 5000)**)
2.  Describe the desired adjustments in the prompt.
3.  Choose the target resolution and submit.
4.  Review the enhanced output and download the version you like best.

## Pro tips[](#pro-tips)

*   Start with clear instructions about colors, lighting, or objects to adjust.
*   Pair positive and negative prompts to control what should or should not appear.
*   Keep source images at or above your target resolution for optimal fidelity.

## Note[](#note)

If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.5/image-edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*1280",
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

images

array

Yes

\[\]

\-

List of URLs of input images for editing. The maximum number of images is 2.

size

string

No

1280\*1280

384 ~ 5000 per dimension

The size of the generated image in pixels (width\*height).

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

[Alibaba Wan 2.2 T2V Plus 480p](/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-480p "Alibaba Wan 2.2 T2V Plus 480p")[Alibaba Wan 2.5 Image To Video](/docs/docs-api/alibaba/alibaba-wan-2.5-image-to-video "Alibaba Wan 2.5 Image To Video")