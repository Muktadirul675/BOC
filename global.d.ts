// name: string; topics: { id: string; name: string; subjectId: string; }[]; articles: { id: string; title: string; content: string; coverImage: string | null; authorEmail: string; status: string; createdAt: Date; updatedAt: Date; }[];

export declare global {
    interface Subject{
        id?: string,
        name: string,
        topics? : Topic[],
        articles? : Article[]
    }

    interface Topic{
        id? : string,
        name: string,
        articles? : Article[],
        subjectId? : string
        subject?: Subject
    }

    interface Role {
        id: string;
        name: string;
    }

    interface Article {
        id: string,
        title: string,
        content: string,
        coverImage: string | null,
        authorEmail: string,
        status: string,
        createdAt: DateTime,
        updatedAt: DateTime,
        author?: Author,
        subjects?: Subject[],
        tags?: Tag[],
    }
    interface DraftArticle {
        id: string,
        title: string,
        content: string | null,
        coverImage: string | null,
        authorEmail: string,
        status: string,
        createdAt: DateTime,
        updatedAt: DateTime,
        author?: Author,
        subjects?: Subject[],
        tags?: Tag[],
    }
}