# /docs/docs-api/google/google-veo3-fast-image-to-video

来源: https://wavespeed.ai/docs/docs-api/google/google-veo3-fast-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Veo3 Fast Image To Video

# Google Veo3 Fast Image To Video

Google Veo3 Fast Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/veo3-fast/image-to-video)

Generate videos with Google Veo 3 Fast - faster and more cost-effective than standard Veo 3. Starting at $0.25/second. Commercial use allowed.

## Features[](#features)

# Google Veo 3 Fast — Image-to-Video (I2V) Model

**Veo 3 Fast (I2V)** is the high-speed **image-to-video** variant of Google’s Veo 3 generative suite. It transforms static images into **cinematic 1080p motion clips** with synchronized native audio — all in a fraction of the time and cost of standard Veo 3.

* * *

## ⚡ Why it stands out[](#-why-it-stands-out)

*   **From Still Image to Story** Turn a single reference image into smooth, realistic motion sequences with natural lighting and perspective continuity.
    
*   **High Speed, Low Cost** Generates videos up to **30 % faster** while using **80 % fewer credits**, ideal for rapid creative iterations.
    
*   **Cinematic Realism** Produces expressive camera motion, atmospheric lighting, and lifelike character animation.
    
*   **Native Audio Sync** Automatically adds ambient sound, subtle effects, and music that match the visual rhythm — no post-production required.
    
*   **Style & Identity Consistency** Keeps subjects, color tone, and camera direction faithful to the uploaded image for coherent storytelling.
    

* * *

## ⚙️ Limits and Performance[](#️-limits-and-performance)

Property

Description

**Input**

Single image + text prompt

**Max duration**

8 seconds

**Resolution**

Up to 1080p

**Audio**

Native synchronized dialogue, ambient, and music

**Output format**

MP4 with stereo audio

* * *

## 💰 Pricing[](#-pricing)

Every run needs **$1.2** (both 720p and 1080p)

✅ Commercial use allowed

* * *

## 🚀 How to Use[](#-how-to-use)

1.  **Upload an Image** Provide a clear, well-lit source image — this defines your main subject and composition.
    
2.  **Write a Prompt** Describe the desired motion, mood, and camera behavior.
    
    > Example: _“Slow cinematic zoom out from the character as wind moves through the trees.”_
    
3.  **Adjust Settings** Choose the **duration** (up to 8 s) and **resolution** (up to 1080p).
    
4.  **Generate the Video** Submit your job — Veo 3 Fast I2V automatically creates the motion and synchronized soundscape.
    
5.  **Preview & Download** Review your result, refine your prompt if needed, and download the final MP4 file.
    

* * *

## 💡 Pro Tips[](#-pro-tips)

*   Use **bright, high-contrast source images** for clearer motion definition.
*   Keep prompts **focused on one subject or action** to ensure stability.
*   Add cinematic cues like _“soft daylight,” “slow pan,”_ or _“dramatic backlight”_ for stylistic control.
*   Avoid extreme or conflicting directions (e.g., “zoom in and out simultaneously”).
*   For multiple related clips, reuse the same source image for consistent appearance.

* * *

## 📝 Notes[](#-notes)

*   Actual processing time varies depending on queue load and resolution.
*   The model is optimized for short, cinematic sequences and social-media content.
*   Ensure your uploaded image is **clear, accessible, and properly licensed**.
*   Please make sure your prompts comply with **Google’s Safety Guidelines** — if an error appears, revise your prompt and try again.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/veo3-fast/image-to-video" \
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

Text prompt for generation; Positive text prompt.

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

Aspect ratio of the video.

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

Generate audio for the video.

negative\_prompt

string

No

\-

Negative prompt for the generation.

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

[Google Veo3 Fast](/docs/docs-api/google/google-veo3-fast "Google Veo3 Fast")[Google Veo3 Image To Video](/docs/docs-api/google/google-veo3-image-to-video "Google Veo3 Image To Video")