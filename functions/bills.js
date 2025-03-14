export const onRequest = async (context) => {
    // Create a prepared statement with our query
    const ps = context.env.DB.prepare("SELECT * from all_bills");
    const data = await ps.first();
    console.log('data', data);
  
    return Response.json(data);
};