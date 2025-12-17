import ApiClient from '../config/api';

export type Category = {
    "category_id": string,
    "category_name": string
};

export type UserInterest = {
    "interest_id": string,
    "category": Category,
    "keywords": string[],
    "is_active": boolean,
    "created_at": string
};

// Payload gửi lên API
export type UpdateInterestPayload = {
  interests: {
    category_id: string;
    keywords: string[];
  }[];
};

export type InterestItem = {
    id: string;
    keyWord: string;
    category_id: string;
};

export const mapUserInterests = (
  interests: UserInterest[]
): InterestItem[] => {
  return interests.flatMap((interest) =>
    interest.keywords.map((keyword) => ({
      id: interest.interest_id + '-' + keyword,
      keyWord: keyword,
      category_id: interest.category.category_id,
    }))
  );
};

function removeKeyword(
  interests: UserInterest[],
  categoryId: string,
  keyword: string
): UpdateInterestPayload {
  const merged = interests
    .map((item) => {
      if (item.category.category_id === categoryId) {
        const filtered = item.keywords.filter((k) => k !== keyword);

        // Nếu category còn keyword thì giữ
        if (filtered.length > 0) {
          return {
            category_id: categoryId,
            keywords: filtered,
          };
        }

        // Nếu không còn keyword → xóa category (return null)
        return null;
      }

      // Giữ nguyên category khác
      return {
        category_id: item.category.category_id,
        keywords: item.keywords,
      };
    })
    .filter(Boolean) as {
      category_id: string;
      keywords: string[];
    }[];

  return { interests: merged };
}

function addKeyword(
  interests: UserInterest[],
  categoryId: string,
  keyword: string
): UpdateInterestPayload {
  let found = false;

  const merged = interests.map((item) => {
    if (item.category.category_id === categoryId) {
      found = true;
      return {
        category_id: categoryId,
        keywords: item.keywords.includes(keyword)
          ? item.keywords
          : [...item.keywords, keyword],
      };
    }

    return {
      category_id: item.category.category_id,
      keywords: item.keywords,
    };
  });

  if (!found) {
    merged.push({
      category_id: categoryId,
      keywords: [keyword],
    });
  }

  return { interests: merged };
}


export const UserInterestService = {
  async getUserInterests(): Promise<InterestItem[]> {
    const res = await ApiClient.get('/api/v1/user-interests');

    return mapUserInterests(res.data);
  },

  async addUserInterest(categoryId: string, keyWord: string): Promise<InterestItem[]> {
    const currentInterestsRes = await ApiClient.get('/api/v1/user-interests');
    console.log('Current Interests:', currentInterestsRes.data);
    const payload = addKeyword(currentInterestsRes.data, categoryId, keyWord);
    console.log('Payload:', payload);
    const res = await ApiClient.put('/api/v1/user-interests', payload);
    return mapUserInterests(res.data);
  },

  async deleteUserInterest(categoryId: string, keyWord: string): Promise<InterestItem[]> {
    const currentInterestsRes = await ApiClient.get('/api/v1/user-interests');
    const payload = removeKeyword(currentInterestsRes.data, categoryId, keyWord);
    const res = await ApiClient.put('/api/v1/user-interests', payload);
    return mapUserInterests(res.data);
  }
};
