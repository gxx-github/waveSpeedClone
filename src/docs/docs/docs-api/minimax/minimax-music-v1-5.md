# /docs/docs-api/minimax/minimax-music-v1.5

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-music-v1.5

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Music V1.5

# Minimax Music V1.5

Minimax Music V1.5

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/music-v1.5)

Generate music from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality, diverse musical compositions.

## Features[](#features)

# MiniMax Music v1.5 — AI Music & Lyric Generator

**minimax/music-v1.5** is an end-to-end music generator that creates catchy songs from short style cues and structured lyrics. Provide a **lyrics\_prompt** for mood/genre guidance and a **prompt** with sectioned lyrics, and the model returns a complete track with vocals and instrumental backing.

* * *

## 🎵 What it does[](#-what-it-does)

*   **Genre & mood control** via `lyrics_prompt` (e.g., “pop, upbeat, inspirational, feel-good”).
*   **Structured songwriting** from your `prompt` using labeled sections like `[verse]`, `[chorus]`, `[bridge]`.
*   **Full mix output** with lead vocal + accompaniment rendered as a single track.

* * *

## ⚙️ Inputs[](#️-inputs)

*   **lyrics\_prompt** _(required)_: short style tags and mood descriptors.
    
    *   Examples: `pop, upbeat, summer vibes`, `indie folk, intimate, acoustic`, `EDM, energetic, festival drop`.
*   **prompt** _(required)_: your lyrics with explicit section markers.
    
    *   Supported tags: `[intro]`, `[verse]`, `[pre-chorus]`, `[chorus]`, `[post-chorus]`, `[bridge]`, `[outro]`.
    *   Write plain text after each tag on one or more lines.

**Format example**

```
[verse]Radio static, hadn't smiled in a while. A forgotten song came on, and blew away my care.
[chorus]That one song changed it all. The hope a simple melody can bring.
Lifts you up and makes you strong, three minutes where you belong.
```

* * *

## 🚀 How to Use[](#-how-to-use)

1.  **Set `lyrics_prompt`** — list genre, tempo/energy, mood (comma-separated).
2.  **Compose `prompt`** — paste your lyrics using section tags (Up to **600 charactors**).
3.  (Optional) Keep sections short (2–4 lines) for cleaner phrasing and hooks.
4.  **Run** — receive a mixed audio track ready to preview and download.

* * *

## 💰 Pricing[](#-pricing)

Per run only for **$0.03** !!!

* * *

## ✍️ Ready-to-copy templates[](#️-ready-to-copy-templates)

**Pop / feel-good**

```
lyrics_prompt: pop, upbeat, catchy, summer, feel-good

prompt:
[intro]Sun on my face, wheels on the road.
[verse]Left all my worries in the rearview mirror, chasing the light as the skyline gets nearer.
[pre-chorus]Heart on the beat, road under my feet.
[chorus]We’re wide awake tonight—sing it out, lights are in our eyes.
Every mile feels right—turn it up, let the world go by.
```

**Indie folk / intimate**

```
lyrics_prompt: indie folk, acoustic, warm, reflective

prompt:
[verse]Coffee steam and open windows, morning writes across the floor.
[chorus]If home is where the quiet grows, I’ll find it in your voice once more.
```

**EDM / festival**

```
lyrics_prompt: EDM, energetic, anthemic, festival drop

prompt:
[verse]Hands up, heartbeat running wild, neon rivers in the night.
[build]Count it down—4, 3, 2—
[chorus]We break like thunder, we’re lightning undercover; let the sky remember our names tonight!
```

* * *

## 📝 Notes[](#-notes)

*   Avoid overly long paragraphs; 2–4 lines per section yields cleaner melodies.
*   If an error occurs, simplify the prompt (fewer tags, clearer mood) and try again.
*   Ensure the prompt length has at most **600 characters**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/music-v1.5" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "lyrics_prompt": "blues, melancholic, raw, lonely bar, heartbreak.",
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

lyrics\_prompt

string

Yes

blues, melancholic, raw, lonely bar, heartbreak.

\-

Control music generation by inputting a text prompt. Valid input: 10-300 characters.

prompt

string

Yes

\-

The positive prompt for the generation.

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

[Minimax Hailuo 02 T2V Standard](/docs/docs-api/minimax/minimax-hailuo-02-t2v-standard "Minimax Hailuo 02 T2V Standard")[Minimax Speech 02 Hd](/docs/docs-api/minimax/minimax-speech-02-hd "Minimax Speech 02 Hd")