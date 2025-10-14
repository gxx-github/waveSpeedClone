# /docs/docs-api/minimax/minimax-voice-design

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-voice-design

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Voice Design

# Minimax Voice Design

Minimax Voice Design

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/voice-design)

MiniMax Voice Design is a state-of-the-art voice synthesis model developed by MiniMax. Instead of cloning a voice from a reference audio, it generates high-quality voices directly from your textual description, allowing you to create speech with the desired tone, accent, and personality.

## Features[](#features)

# MiniMax Voice Design

**MiniMax Voice Design** is a state-of-the-art voice synthesis model developed by MiniMax. Instead of cloning a voice from a reference audio, it generates high-quality voices based on your textual voice description, allowing you to create speech with the desired tone, accent, and personality.

## Key Features[](#key-features)

*   **High-Fidelity Voice Generation**  
    Produces speech that matches your description with natural prosody and pronunciation.
    
*   **Flexible Voice Design**  
    Create a wide range of voices by simply describing the desired characteristics—no reference audio required.
    
*   **Emotion and Tone Control**  
    Fine-tune speaking style and emotion for storytelling, games, and character dialogue.
    
*   **Multilingual Output**  
    Supports voice design across different languages and smooth code-switching.
    
*   **Low-Latency Inference**  
    Optimized for real-time use cases, including live interactions and dialogue generation.
    

## Use Cases[](#use-cases)

*   AI voiceovers for content creators and influencers
*   Personalized digital assistants and chatbots
*   Audiobook narration in a specific style
*   Interactive gaming and character voices
*   Assistive speech for individuals with voice loss

## Model Overview[](#model-overview)

MiniMax Voice Design uses a neural TTS pipeline with robust speaker and prosody modeling. By leveraging your textual description, it offers clarity, control, and speed, delivering production-ready results in diverse environments.

## Note[](#note)

Your custom **voice ID** must be used **at least once** with one of the voice models on our platform to be **saved permanently**. Such as:

*   [minimax/speech-02-hd](https://wavespeed.ai/models/minimax/speech-02-hd)
*   [minimax/speech-02-turbo](https://wavespeed.ai/models/minimax/speech-02-turbo)

Otherwise, we can only **store it for 7 days**. After that, it will be deleted and the voice ID will no longer be callable.

For easier reuse later, please make sure to use your voice ID once in one of the models above after creating it.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/voice-design" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "text": "Hello! Welcome to Wavespeed! This is a preview of your cloned voice. I hope you enjoy it"
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

custom\_voice\_id

string

Yes

\-

\-

Custom user-defined ID. Minimum 8 characters; must include letters and numbers and start with a letter (e.g., WaveSpeed001). Duplicate voice-ids will throw an error.

text

string

Yes

Hello! Welcome to Wavespeed! This is a preview of your cloned voice. I hope you enjoy it

\-

Text for audio preview. Limited to 500 characters.

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

[Minimax Voice Clone](/docs/docs-api/minimax/minimax-voice-clone "Minimax Voice Clone")[Kwaivgi Kling Effects](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi Kling Effects")