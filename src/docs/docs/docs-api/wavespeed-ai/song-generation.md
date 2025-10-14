# /docs/docs-api/wavespeed-ai/song-generation

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/song-generation

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Song Generation

# Song Generation

Song Generation

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/song-generation)

SongGeneration (LeVo) is an open-source text-to-song model that generates high-quality songs with lyrics. It aligns with cutting-edge commercial music generation models like Suno 4.5. Provide lyrics, and optionally an audio or text prompt, to generate a custom song.

## Features[](#features)

# SongGeneration

SongGeneration (LeVo) is an open-source text-to-song model developed by Tencent AI Lab that generates high-quality songs with lyrics. It aligns with cutting-edge commercial music generation models like Suno 4.5. Provide lyrics, and optionally an audio or text prompt, to generate a custom song.

## Usage[](#usage)

Provide a lyrics, and optionally an audio or text prompt, to generate a custom song.

### Lyrics format[](#lyrics-format)

Lyrics need to be in the following format:

```
[structure tag]
lyrics
[structure tag]
lyrics
```

1.  One paragraph represents one segments, starting with a structure tag and ending with a blank line
2.  One line represents one sentence, punctuation is not recommended inside the sentence
3.  The following segments should not contain lyrics: \[intro-short\], \[intro-medium\], \[inst-short\], \[inst-medium\], \[outro-short\], \[outro-medium\]
4.  The following segments require lyrics: \[verse\], \[chorus\], \[bridge\]

An example of Lyrics is as follows:

```
[intro-short]

[verse]
Streetlights flicker in the night
I wander through familiar corners
Memories rush in like a tide
Your smile so vivid and bright
Etched in my heart, it won’t fade
All those moments once so sweet
Now I’m left with only memories

[verse]
My phone screen lights up
A message from you appears
Just a few simple words
Yet they bring me to tears
The warmth of your embrace
Now feels so far away
How I wish to turn back time
And have you by my side again

[chorus]
The warmth of memories still remains
But you are gone
My heart was filled with love
Now pierced by longing
The rhythm of music plays
But my heart is drifting
In days without you
How can I keep moving on

[outro-short]
```

### Description[](#description)

Description could be used to describe the genre of the music, as well as the timbre.

```
female, dark, pop, sad, piano and drums, the bpm is 125
```

### Prompt Audio[](#prompt-audio)

Prompt Audio could be used to guide the model to learn the genre in the music audio.

### Priority[](#priority)

```
Priority: prompt_audio > description > genre
```

## Input Guide[](#input-guide)

### 🎵 Lyrics Input Format[](#-lyrics-input-format)

The `lyric` field defines the lyrics and structure of the song. It consists of multiple musical section, each starting with a structure label. The model uses these labels to guide the musical and lyrical progression of the generated song.

#### 📌 Structure Labels[](#-structure-labels)

*   The following segments **should not** contain lyrics (they are purely instrumental):
    
    *   `[intro-short]`, `[intro-medium]`, `[inst-short]`, `[inst-medium]`, `[outro-short]`, `[outro-medium]`
    
    > *   `short` indicates a segment of approximately 0–10 seconds
    > *   `medium` indicates a segment of approximately 10–20 seconds
    > *   We find that \[inst\] label is less stable, so we recommend that you do not use it.
    
*   The following segments **require lyrics**:
    
    *   `[verse]`, `[chorus]`, `[bridge]`

Current supported segments are:

```
[verse]
[chorus]
[bridge]
[intro-short]
[intro-medium]
[intro-long]
[outro-short]
[outro-medium]
[outro-long]
[inst-short]
[inst-medium]
[inst-long]
[silence]
```

#### 🧾 Lyrics Formatting Rules[](#-lyrics-formatting-rules)

*   Each section is **separated by an empty line**
    
*   Within lyrical segments (`[verse]`, `[chorus]`, `[bridge]`), lyrics must be written in complete sentences, and each sentence is one line.
    

### 📝 Description Input Format[](#-description-input-format)

The `description` field allows you to control various musical attributes of the generated song. It can describe up to six musical dimensions: **Gender** (e.g., male, female), **Timbre** (e.g., dark, bright, soft), **Genre** (e.g., pop, jazz, rock), **Emotion** (e.g., sad, energetic, romantic), **Instrument** (e.g., piano, drums, guitar), **BPM** (e.g., the bpm is 120).

*   All six dimensions are optional — you can specify any subset of them.
    
*   The order of dimensions is flexible.
    
*   Use **commas (`,`)** to separate different attributes.
    
*   Although the model supports open vocabulary, we recommend using predefined tags for more stable and reliable performance. A list of commonly supported tags for each dimension is available in [sample descriptions](https://github.com/tencent-ailab/SongGeneration/tree/main/sample/description).
    
*   Here are a few valid `descriptions` inputs:
    
    ```
    - female, dark, pop, sad, piano and drums, the bpm is 125.
    - male, piano, jazz.
    - male, dark, the bpm is 110.
    ```
    

### 🎧Prompt Audio Usage Notes[](#prompt-audio-usage-notes)

*   The input audio file can be longer than 10 seconds, but only the first 10 seconds will be used.
*   For best musicality and structure, it is recommended to use the chorus section of a song as the prompt audio.
*   You can use this field to influence genre, instrumentation, rhythm, and voice.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/song-generation" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "genre": "Auto",
    "guidance_scale": 1.5,
    "temperature": 0.9,
    "top_k": 50,
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

lyric

string

Yes

\-

\-

Each paragraph represents a segment starting with a structure tag and ending with a blank line, each line is a sentence without punctuation, segments \[intro\], \[inst\], \[outro\] should not contain lyrics, while \[verse\], \[chorus\], and \[bridge\] require lyrics.

description

string

No

\-

\-

Song Description (Optional). Describe the gender, timbre, genre, emotion, instrument and bpm of the song. Only English is supported currently.

prompt\_audio

string

No

\-

\-

Prompt Audio (Optional). Provide a URL to an audio file that serves as a prompt for the genre of the song generation.

genre

string

No

Auto

Pop, R&B, Dance, Jazz, Folk, Rock, Chinese Style, Chinese Tradition, Metal, Reggae, Chinese Opera, Auto

Genre Select (Optional). Choose a genre for the song.

guidance\_scale

number

No

1.5

0.1 ~ 3.0

The guidance scale to use for the generation.

temperature

number

No

0.9

0.1 ~ 2.0

The temperature to use for the generation. A higher value means more randomness in the output.

top\_k

integer

No

50

1 ~ 100

The top-k value to use for the generation. This controls the number of highest probability vocabulary tokens to keep for top-k-filtering.

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

[SkyReels V1](/docs/docs-api/wavespeed-ai/SkyReels-V1 "SkyReels V1")[Step1x Edit](/docs/docs-api/wavespeed-ai/step1x-edit "Step1x Edit")