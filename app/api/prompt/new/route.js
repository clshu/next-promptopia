import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req, _res) => {
  const { userId, prompt, tag } = await req.json();
  console.log('=> POST /api/prompt/new');
  // console.log({ userId, prompt, tag });

  let newPrompt = prompt;

  try {
    await connectToDB();

    const prompt = await Prompt.create({
      creator: userId,
      prompt: newPrompt,
      tag,
    });
    // console.log({ prompt });
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
