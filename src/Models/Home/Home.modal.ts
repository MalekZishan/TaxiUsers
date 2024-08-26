export interface HomeModal {
  id: number;
  teaImage: string;
  teaName: string;
  teaRating: string;
  likeCount: number;
  is_like: any;
  commentCount: any;
  reviewCount: any;
}

export interface MyTeaModal {
  id: number;
  teaBrand: string;
  teaName: string;
  brewType: string;
  tasteNotes: string;
  teaImage: string;
  teaRating: string;
  notes: string;
  userId: string;
  userName: string;
  userImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Detailsmodal {
  id: number;
  teaBrand: string;
  teaName: string;
  reviewCount: number;
  brewType: string;
  tasteNotes: string;
  teaImage: string;
  teaRating: string;
  notes: string;
  teaType: string;
  userId: string;
  userName: string;
  userImage: string;
  likeCount: string;
  commentCount: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewModal {
  id: number;
  teaId: string;
  userId: string;
  userName: string;
  userImage: string;
  review: string;
  rating: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface MyRatingModal {
  id: number;
  teaId: string;
  userId: string;
  review: string;
  rating: any;
  createdAt: Date;
  updatedAt: Date;
  teaName: string;
  teaImage: string;
}

export interface Commentmodal {
  comment: string;
  createdAt: Date;
  id: number;
  teaId: string;
  updatedAt: Date;
  userId: string;
  userImage: string;
  userName: string;
}
