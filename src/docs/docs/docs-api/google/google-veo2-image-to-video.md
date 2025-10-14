# /docs/docs-api/google/google-veo2-image-to-video

来源: https://wavespeed.ai/docs/docs-api/google/google-veo2-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Veo2 Image To Video

# Google Veo2 Image To Video

Google Veo2 Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/veo2/image-to-video)

Veo 2 creates videos with realistic motion and high quality output. Explore different styles and find your own with extensive camera controls.

## Features[](#features)

# Google Veo2 on WaveSpeedAI

**Google Veo2 on WaveSpeedAI** empowers you to create high-quality videos from both text prompts and static images, leveraging Google’s advanced AI for next-generation content creation.

* * *

## Overview[](#overview)

Veo2 on WaveSpeedAI is designed for seamless text-to-video and image-to-video generation. It understands real-world physics, human movement, and cinematic techniques, making it ideal for creators and developers who want to produce visually stunning, dynamic videos at scale.

* * *

## 🚀 Key Capabilities[](#-key-capabilities)

*   **Text-to-Video Generation**  
    Turn your ideas into cinematic videos with natural motion and high visual fidelity.
*   **Image-to-Video Animation**  
    Animate static images into smooth, engaging video sequences.
*   **Advanced Camera & Cinematic Controls**  
    Fine-tune camera movement, shot composition, and visual style for professional results.
*   **Production-Ready Output**  
    Generate videos suitable for commercial use, marketing, and creative projects.
*   **Scalable Processing**  
    Handle large volumes of content efficiently with WaveSpeedAI’s robust infrastructure.

* * *

## 🌟 Popular Use Cases[](#-popular-use-cases)

*   **Marketing & Advertising**: Transform product photos into eye-catching video ads and dynamic social media content.
*   **Content Creation**: Bring blog images to life, generate video thumbnails, and create engaging presentations from text.
*   **E-commerce**: Showcase products in motion, create lifestyle videos, and enhance online shopping experiences.
*   **Creative Projects**: Animate illustrations, craft cinematic sequences, and explore new forms of motion graphics.

* * *

## ✨ Prompting Tips[](#-prompting-tips)

To get the best results with Veo2 on WaveSpeedAI, try these strategies:

*   **Shot Composition**: `Close-up`, `two shot`, `over-the-shoulder`
*   **Lens & Focus**: `Macro lens`, `shallow focus`, `wide-angle lens`
*   **Genre & Style**: `Sci-fi`, `romantic comedy`, `action movie`
*   **Camera Motion**: `Zoom shot`, `dolly shot`, `tracking shot`, `pan shot`

* * *

### 🎬 Example Prompt[](#-example-prompt)

> _A close-up shot of melting icicles on a frozen rock wall, with cool blue tones and a zoom-in camera movement, capturing the detailed motion of water drips._

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/veo2/image-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "720p",
    "enable_prompt_expansion": true
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

image

string

Yes

\-

The image to use for the generation.

aspect\_ratio

string

No

16:9

16:9, 9:16

The aspect ratio of the generated media.

duration

integer

No

5

5, 6, 7, 8

The duration of the generated media in seconds.

resolution

string

No

720p

720p

Video resolution.

enable\_prompt\_expansion

boolean

No

true

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

\-

\-1 ~ 2147483647

The random seed to use for the generation.

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

[Google Veo2](/docs/docs-api/google/google-veo2 "Google Veo2")[Google Veo3](/docs/docs-api/google/google-veo3 "Google Veo3")