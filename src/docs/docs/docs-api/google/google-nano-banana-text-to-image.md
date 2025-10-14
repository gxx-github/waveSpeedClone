# /docs/docs-api/google/google-nano-banana-text-to-image

来源: https://wavespeed.ai/docs/docs-api/google/google-nano-banana-text-to-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Nano Banana Text To Image

# Google Nano Banana Text To Image

Google Nano Banana Text To Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/nano-banana/text-to-image)

Google’s Nano Banana is a cutting-edge text-to-image generation model.

## Features[](#features)

# Google Nano-Banana Text-to-Image

**Nano-Banana Text-to-Image** is Google’s lightweight yet powerful **AI image generation model**, built for creators who need fast, high-quality visuals from simple text prompts. It transforms words into expressive, realistic images with remarkable clarity, composition, and style diversity — all within seconds.

* * *

## 🌟 Why it stands out[](#-why-it-stands-out)

*   **Instant Image Creation** Generate beautiful, coherent visuals from just a short text prompt — no design skills required.
    
*   **Versatile Visual Styles** Supports realistic, illustrative, anime, and painterly outputs, adapting naturally to your creative intent.
    
*   **Accurate Text-to-Scene Understanding** Accurately interprets subjects, backgrounds, and object relationships to create contextually correct compositions.
    
*   **Fast & Efficient** Optimized for quick turnaround and minimal compute cost, perfect for rapid prototyping and social content.
    
*   **Clean, Balanced Lighting** Produces visually appealing results without overexposure or unnatural shadows — ideal for portraits, landscapes, and product imagery.
    

* * *

## ⚙️ Capabilities[](#️-capabilities)

*   Input: text prompt
    
*   Output: high-quality image (**JPEG/PNG/WEBP**)
    
*   Supports multiple **aspect ratios** and **output format**
    
*   Compatible with descriptive prompts such as:
    
    *   _“A golden retriever playing in a field of sunflowers at sunset.”_
    *   _“A futuristic city skyline with neon reflections on wet streets.”_
    *   _“An elegant still-life photo of coffee and croissants by a window.”_

* * *

## 💰 Pricing[](#-pricing)

*   **$0.038 per image**
*   Commercial use allowed

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Social Media & Marketing** — Create on-brand visuals instantly.
*   **Concept Art & Storyboarding** — Generate design ideas and moodboards effortlessly.
*   **E-commerce & Advertising** — Produce high-quality product images without photography.
*   **Education & Presentation** — Visualize complex ideas or creative concepts easily.

* * *

## 📝 Notes[](#-notes)

Please ensure your prompts comply with **Google’s Safety Guidelines**. If an error occurs, review your prompt for restricted content, adjust it, and try again.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/nano-banana/text-to-image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "output_format": "png",
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

aspect\_ratio

string

No

\-

1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

The aspect ratio of the generated media.

output\_format

string

No

png

png, jpeg

The format of the output image.

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

[Google Nano Banana Effects](/docs/docs-api/google/google-nano-banana-effects "Google Nano Banana Effects")[Google Veo2](/docs/docs-api/google/google-veo2 "Google Veo2")