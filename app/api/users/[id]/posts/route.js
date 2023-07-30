import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (_request, { params }) => {
  console.log('=> GET /api/users/[id]/posts');
  console.log(params);

  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
