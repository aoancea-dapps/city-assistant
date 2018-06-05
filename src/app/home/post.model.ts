export class Post {
    id: number;
    hash: string;
    title: string;
    content: string;

    votes: number;

    owner_name: string;
    owner_image_url: string;
}

export class HashStore {
    owner: string;
    hash: string;
}
