# /docs/docs-api/google/google-imagen4

来源: https://wavespeed.ai/docs/docs-api/google/google-imagen4

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Imagen4

# Google Imagen4

Google Imagen4

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/imagen4)

Google’s Imagen 4 flagship model

## Features[](#features)

# Google’s Imagen 4

The **Imagen 4 series** represents Google’s latest generation of **high-quality text-to-image models**, offering unparalleled fidelity, style flexibility, and advanced text rendering. Whether you need cinematic photorealism, stylized artwork, or crisp typography, Imagen 4 is designed to deliver.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Fine detail rendering**: Superior clarity for intricate elements like fabrics, water droplets, and animal fur.
*   **Style versatility**: Excels in both photorealistic and abstract artistic styles.
*   **Resolution flexibility**: Supports multiple aspect ratios with outputs up to **2K resolution**.
*   **Typography improvements**: Dramatically better at rendering text on greeting cards, posters, and comics.
*   **Fast variant**: The upcoming Imagen 4 Fast delivers **up to 10× faster generation** compared to Imagen 3.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max resolution per job**: up to **2048 × 2048 pixels (2K)**
*   **Aspect ratio options**: 1:1, 16:9, 9:16, 4:3, 3:4
*   **Max images per run**: up to **4 images per prompt**
*   **Processing speed**: ~**5–12 seconds per image** (Ultra variant may take longer; Fast is optimized for speed)
*   **Input prompt**: supports **multi-line, richly detailed descriptions**

* * *

## Pricing[](#pricing)

Just **$0.038** per image!!!

### Billing Rule[](#billing-rule)

You can generate up to **4 images at once**, billed individually.

* * *

## How to Use[](#how-to-use)

1.  Enter your **prompt** (detailed description of the scene, style, or text).
2.  Select **aspect\_ratio** (e.g., 1:1 for square, 16:9 for widescreen).
3.  Choose **resolution** (1K or 2K).
4.  Set **num\_images** (up to 4).
5.  (Optional) Add a **negative\_prompt** to exclude unwanted details.
6.  (Optional) Fix a **seed** for reproducibility across runs.
7.  Click **Run** → pay per image → preview and download results.

* * *

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Use **rich, descriptive prompts** with lighting, mood, and style details.
*   For **typography**, specify exact text and style (handwritten, bold, comic font, etc.).
*   Use **Ultra** for maximum fidelity, **Fast** for speed and iteration.
*   Lock a **seed** if you want consistent subject appearance across multiple images.

* * *

## More Versions[](#more-versions)

*   [Imagen 4](https://wavespeed.ai/models/google/imagen4)
*   [Imagen 4 Ultra](https://wavespeed.ai/models/google/imagen4-ultra)
*   [Imagen 4 Fast](https://wavespeed.ai/models/google/imagen4-fast)

* * *

## Note[](#note)

If you encounter the error message ‘**Content is filtered due to unknown reasons**,’ please review your prompt input, modify your prompt, and regenerate.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/imagen4" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "1:1",
    "resolution": "1k",
    "num_images": 1,
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

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

resolution

string

No

1k

1k, 2k

The target resolution of the generated media.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

negative\_prompt

string

No

\-

The negative prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

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

[Google Imagen3 Fast](/docs/docs-api/google/google-imagen3-fast "Google Imagen3 Fast")[Google Imagen4 Fast](/docs/docs-api/google/google-imagen4-fast "Google Imagen4 Fast")