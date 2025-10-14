# /docs/docs-api/google/google-veo3

来源: https://wavespeed.ai/docs/docs-api/google/google-veo3

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Veo3

# Google Veo3

Google Veo3

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/veo3)

Sound on: Google’s flagship Veo 3 text-to-video model, now with audio.

## Features[](#features)

# Google Veo 3 — Text-to-Video AI Generator

**Veo 3** is Google DeepMind’s next-generation **text-to-video** model, capable of producing cinematic, high-fidelity videos directly from natural-language prompts. With **native audio generation**, **dialogue lip-sync**, and **deep physical reasoning**, Veo 3 redefines what’s possible in multimodal AI video creation.

* * *

## 🌟 Why it stands out[](#-why-it-stands-out)

*   **Text → Image → Video pipeline** Generate stunning visuals and extend them into smooth, cinematic video sequences.
    
*   **Native Audio Generation** Automatically adds ambient sound, effects, and dialogue synchronized perfectly with visuals—no post-production required.
    
*   **Dialogue & Lip-Sync** Characters can _speak your script_ with accurate lip synchronization, enabling AI filmmaking and animation storytelling.
    
*   **Physics-Aware Motion & Spatial Understanding** Veo 3 understands depth, space, and motion—ideal for dynamic scenes, game environments, and realistic interactions.
    
*   **High Prompt Accuracy** Enhanced natural-language understanding ensures semantic alignment and context-aware video generation.
    
*   **Cinematic Lighting & Quality** Delivers professional-grade output with authentic lighting, depth of field, and motion consistency.
    

* * *

## 🧠 Built by Google DeepMind[](#-built-by-google-deepmind)

Developed by Google DeepMind’s world-class research team, **Veo 3** empowers creators, developers, and studios to push the limits of AI-driven storytelling and visual production.

* * *

## ✍️ Prompting Tips (from Google’s Guide)[](#️-prompting-tips-from-googles-guide)

Use clear, cinematic descriptions for best results:

*   **Shot Composition:** `close-up`, `two-shot`, `over-the-shoulder`
*   **Lens & Focus:** `macro lens`, `shallow focus`, `wide-angle lens`
*   **Genre & Style:** `sci-fi`, `romantic comedy`, `action movie`
*   **Camera Motion:** `zoom shot`, `dolly shot`, `tracking shot`, `pan shot`

* * *

## 🎬 Example Prompt[](#-example-prompt)

> _Close-up shot of melting icicles on a frozen rock wall with cool blue tones, zoomed in to capture the dripping water detail in cinematic lighting and shallow focus._

* * *

## ⚙️ Technical Overview[](#️-technical-overview)

Property

Description

**Type**

Text-to-Video (with Audio)

**Resolution**

Up to 1080p

**Max Duration**

8 seconds

**Output Format**

MP4 + Stereo Audio

**Audio**

Native ambient, dialogue, SFX, and music

* * *

## 💰 Pricing[](#-pricing)

Every run needs **$3.2** (both 720p and 1080p)

✅ Commercial use allowed

* * *

## 🚀 How to Use[](#-how-to-use)

1.  **Write Your Prompt** Describe the scene you want to create — include subjects, actions, lighting, camera movement, and mood.
    
    > Example: “A close-up of a young woman standing in the rain, soft cinematic lighting, slow tracking shot.”
    
2.  **Add Optional Elements**
    
    *   **Dialogue** → Use quotation marks ” ” for spoken lines.
    *   **Reference Image** → Upload one or more images to keep visual consistency across clips.
    *   **Camera Direction** → Add terms like _zoom in_, _pan right_, _tracking shot_ for cinematic movement.
3.  **Choose Video Settings** Select the **duration** (up to 8 seconds) and **resolution** (up to 1080p).
    
4.  **Generate the Video** Submit your prompt — Veo 3 will automatically generate both **video and native audio** (dialogue, ambient sounds, music).
    
5.  **Preview & Download** Review the clip, make prompt refinements if needed, then download the final MP4 file.
    

* * *

💡 _Tip:_ For best results, keep each prompt focused on a single scene or emotional moment. Avoid mixing multiple time periods or locations in one request.

* * *

## 📝 Notes[](#-notes)

*   Optimized for short-form storytelling, advertising, and creative video experiments.
*   Audio is generated natively and currently supports only stereo output.
*   For best clarity, describe the **main subject, scene, and lighting** precisely.
*   Make sure your prompts follow Google’s Safety Guidelines — if an error appears, revise your prompt and try again.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/veo3" \
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

Whether to generate audio.

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

[Google Veo2 Image To Video](/docs/docs-api/google/google-veo2-image-to-video "Google Veo2 Image To Video")[Google Veo3 Fast](/docs/docs-api/google/google-veo3-fast "Google Veo3 Fast")