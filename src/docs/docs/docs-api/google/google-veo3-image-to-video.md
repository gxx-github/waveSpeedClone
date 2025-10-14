# /docs/docs-api/google/google-veo3-image-to-video

来源: https://wavespeed.ai/docs/docs-api/google/google-veo3-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Veo3 Image To Video

# Google Veo3 Image To Video

Google Veo3 Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/veo3/image-to-video)

Sound on: Google’s flagship Veo 3 image to video model, with audio

## Features[](#features)

# Google Veo 3 — Image-to-Video (I2V) Model

**Veo 3 I2V** is the standard **image-to-video** version of Google DeepMind’s Veo 3 generative model. It brings still images to life, creating cinematic 1080p videos with smooth, realistic motion, consistent lighting, and synchronized native audio.

* * *

## 🎬 Why it stands out[](#-why-it-stands-out)

*   **From Image to Motion** Transform a single image into a natural, dynamic video sequence while preserving its original composition and style.
    
*   **Cinematic Realism** Produces high-fidelity motion with natural lighting, accurate perspective, and fluid camera transitions.
    
*   **Native Audio Generation** Automatically generates synchronized sound—including ambient noise, effects, and light music—perfectly aligned with the visuals.
    
*   **Dialogue & Lip-Sync** Enables speaking characters or realistic expressions, ideal for storytelling, marketing, and short-form content.
    
*   **Consistent Subject & Style** Retains the identity, color tone, and visual integrity of your input image throughout the motion sequence.
    

* * *

## ⚙️ Limits and Performance[](#️-limits-and-performance)

Property

Description

**Input**

Single image + text prompt

**Max Duration**

8 seconds

**Resolution**

Up to 1080p

**Audio**

Native synchronized dialogue, ambient sound, and music

**Output Format**

MP4 with stereo audio

* * *

## 💰 Pricing[](#-pricing)

Every run needs **$3.2** (both 720p and 1080p)

✅ Commercial use allowed

* * *

## 🚀 How to Use[](#-how-to-use)

1.  **Upload an Image** Choose a clear, high-quality still image—this defines the subject, framing, and overall style.
    
2.  **Write a Prompt** Describe the desired motion, mood, and camera movement.
    
    > Example: _“Slow cinematic zoom out as wind moves through the trees and sunlight flickers across the leaves.”_
    
3.  **Adjust Settings** Select the video duration (up to 8 seconds) and output resolution (up to 1080p).
    
4.  **Generate the Video** Submit your prompt and image—Veo 3 I2V automatically creates motion, lighting, and audio.
    
5.  **Preview & Download** Review the result, refine the prompt if needed, and download the final MP4.
    

* * *

## 💡 Pro Tips[](#-pro-tips)

*   Use **bright, high-contrast images** for clearer motion and lighting.
*   Keep prompts focused on a single subject or action for best stability.
*   Add camera directions like _“tracking shot,” “slow pan,”_ or _“handheld style”_ to control movement.
*   Specify lighting and mood (e.g., _bright daylight_, _soft sunset glow_).
*   Avoid conflicting motion requests to maintain smooth results.

* * *

## 📝 Notes[](#-notes)

*   Actual processing time depends on queue load and resolution.
*   Optimized for cinematic shorts, ads, and social media clips.
*   Ensure your uploaded image is clear, accessible, and legally usable.
*   Please ensure your prompts comply with **Google’s Safety Guidelines** — if an error occurs, revise your prompt and try again.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/veo3/image-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 8,
    "resolution": "720p",
    "generate_audio": false
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

8

8

The duration of the generated media in seconds.

resolution

string

No

720p

720p, 1080p

Video resolution.

generate\_audio

boolean

No

false

\-

Whether to generate audio.

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

[Google Veo3 Fast Image To Video](/docs/docs-api/google/google-veo3-fast-image-to-video "Google Veo3 Fast Image To Video")[Minimax Hailuo 02 Fast](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax Hailuo 02 Fast")