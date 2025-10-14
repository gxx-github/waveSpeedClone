# /docs/docs-api/google/google-nano-banana-edit

来源: https://wavespeed.ai/docs/docs-api/google/google-nano-banana-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Nano Banana Edit

# Google Nano Banana Edit

Google Nano Banana Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/nano-banana/edit)

Google’s state-of-the-art image generation and editing model

## Features[](#features)

# Google Nano-Banana Edit

**Nano-Banana Edit** is Google’s advanced **AI-powered image editing and generation model**, designed to make visual transformation as intuitive as describing it in words. Built on Google’s cutting-edge computer vision and generative research, it combines precision, flexibility, and semantic awareness for professional-grade editing.

* * *

## 🌟 Why it stands out[](#-why-it-stands-out)

*   **Natural Language Editing** Modify images using simple text instructions — no masking, layering, or manual tools required.
*   **Context-Aware Understanding** Accurately interprets scene structure, spatial relationships, and object semantics for realistic results.
*   **Style and Tone Preservation** Keeps lighting, shadows, and texture consistent with the original image while applying changes seamlessly.
*   **High Precision Control** Excels at fine-grained edits such as color adjustments, object replacement, or composition shifts with minimal distortion.
*   **Creative Versatility** Suitable for concept art, photography, advertising design, and everyday content creation.

* * *

## ⚙️ How to use[](#️-how-to-use)

*   **Input:** existing image + text prompt
    
*   **Output:** edited image (**JPEG/PNG/WEBP**)
    
*   **Size:** 1:1, 4:3, 16:9, 21:9, and so on.
    
*   Supports style transfer, relighting, background replacement, and object modification
    
*   Works with natural prompts like:
    
    *   _“Replace the cloudy sky with a clear sunset.”_
    *   _“Add soft studio lighting and a modern background.”_
    *   _“Turn the model’s outfit into a formal business suit.”_

* * *

## 💰 Pricing[](#-pricing)

*   **$0.038** per image
    
*   Commercial use allowed
    

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Marketing & Branding** — Update campaign visuals without reshooting.
*   **Product Photography** — Adjust materials, lighting, or layout instantly.
*   **Social Media & Content Creation** — Generate multiple variations with minimal effort.
*   **Artistic Design** — Experiment with colors, styles, and compositions effortlessly.

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/nano-banana/edit" \
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

images

array

Yes

\[\]

\-

List of URLs of input images for editing. The maximum number of images is 10.

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

[Google Imagen4 Ultra](/docs/docs-api/google/google-imagen4-ultra "Google Imagen4 Ultra")[Google Nano Banana Effects](/docs/docs-api/google/google-nano-banana-effects "Google Nano Banana Effects")