export interface Data {
  error?: string;
  type?: string;
  rooted?: number;
  pvalue_avg?: number;
  tree?: Tree;
}

export interface Tree {
  children: Children[];
  id: number;
  p_value_lim: number;
  tax: Tax28;
  n_members: number;
  name: string;
  lambda: number;
}

export interface Children {
  id: number;
  children?: Children2[];
  lambda: number;
  name: string;
  n_members: number;
  tax: Tax27;
  p_value_lim: number;
}

export interface Children2 {
  children?: Children3[];
  id: number;
  tax: Tax26;
  p_value_lim: number;
  name: string;
  lambda: number;
  n_members: number;
}

export interface Children3 {
  children?: Children4[];
  id: number;
  tax: Tax25;
  p_value_lim: number;
  lambda: number;
  name: string;
  n_members: number;
}

export interface Children4 {
  lambda: number;
  name: string;
  p_value_lim: number;
  tax: Tax;
  id: number;
  children: Children5[];
  n_members: number;
  is_expansion?: number;
}

export interface Tax {
  scientific_name: string;
  timetree_mya: string;
  id: number;
  common_name: string;
}

export interface Children5 {
  pvalue?: number;
  n_members: number;
  children?: Children6[];
  id: number;
  p_value_lim: number;
  tax: Tax24;
  lambda: number;
  name: string;
}

export interface Children6 {
  id: number;
  pvalue: number;
  p_value_lim: number;
  tax: Tax2;
  lambda: number;
  name: string;
  n_members: number;
  children?: Children7[];
  is_contraction?: number;
}

export interface Tax2 {
  id: number;
  production_name?: string;
  common_name: string;
  scientific_name: string;
  timetree_mya: unknown;
}

export interface Children7 {
  tax: Tax3;
  p_value_lim: number;
  lambda: number;
  name: string;
  pvalue: number;
  n_members: number;
  children: Children8[];
  id: number;
}

export interface Tax3 {
  timetree_mya: string;
  scientific_name: string;
  id: number;
  common_name: string;
}

export interface Children8 {
  p_value_lim: number;
  tax: Tax4;
  lambda: number;
  name: string;
  pvalue: number;
  n_members: number;
  children?: Children9[];
  id: number;
}

export interface Tax4 {
  id: number;
  common_name: string;
  scientific_name: string;
  timetree_mya: unknown;
  production_name?: string;
}

export interface Children9 {
  p_value_lim: number;
  tax: Tax5;
  name: string;
  lambda: number;
  pvalue: number;
  n_members: number;
  children?: Children10[];
  id: number;
}

export interface Tax5 {
  timetree_mya: unknown;
  scientific_name: string;
  common_name?: string;
  id: number;
  production_name?: string;
}

export interface Children10 {
  id: number;
  children?: Children11[];
  n_members: number;
  pvalue: number;
  lambda: number;
  name: string;
  tax: Tax23;
  p_value_lim: number;
}

export interface Children11 {
  name: string;
  lambda: number;
  p_value_lim: number;
  tax: Tax6;
  id: number;
  children?: Children12[];
  n_members: number;
  pvalue: number;
}

export interface Tax6 {
  common_name?: string;
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
  production_name?: string;
}

export interface Children12 {
  n_members: number;
  pvalue: number;
  id: number;
  children?: Children13[];
  name: string;
  lambda: number;
  tax: Tax22;
  p_value_lim: number;
}

export interface Children13 {
  name: string;
  lambda: number;
  p_value_lim: number;
  tax: Tax7;
  id: number;
  children?: Children14[];
  n_members: number;
  pvalue: number;
  is_contraction?: number;
}

export interface Tax7 {
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
  common_name?: string;
  production_name?: string;
}

export interface Children14 {
  id: number;
  lambda: number;
  name: string;
  n_members: number;
  tax: Tax8;
  p_value_lim: number;
  pvalue: number;
  children?: Children15[];
  is_contraction?: number;
}

export interface Tax8 {
  timetree_mya: unknown;
  scientific_name: string;
  production_name?: string;
  common_name?: string;
  id: number;
}

export interface Children15 {
  p_value_lim: number;
  tax: Tax9;
  pvalue: number;
  n_members: number;
  name: string;
  lambda: number;
  id: number;
  children?: Children16[];
  is_expansion?: number;
  is_node_significant?: number;
  is_contraction?: number;
}

export interface Tax9 {
  id: number;
  production_name?: string;
  common_name?: string;
  scientific_name: string;
  timetree_mya: unknown;
}

export interface Children16 {
  n_members: number;
  name: string;
  lambda: number;
  tax: Tax10;
  p_value_lim: number;
  pvalue: number;
  id: number;
  children?: Children17[];
  is_node_significant?: number;
  is_contraction?: number;
}

export interface Tax10 {
  scientific_name: string;
  timetree_mya: unknown;
  id: number;
  production_name?: string;
  common_name?: string;
}

export interface Children17 {
  children?: Children18[];
  id: number;
  pvalue: number;
  n_members: number;
  tax: Tax21;
  p_value_lim: number;
  name: string;
  lambda: number;
  is_contraction?: number;
  is_node_significant?: number;
}

export interface Children18 {
  n_members: number;
  pvalue: number;
  id: number;
  children?: Children19[];
  lambda: number;
  name: string;
  tax: Tax20;
  p_value_lim: number;
}

export interface Children19 {
  lambda: number;
  name: string;
  p_value_lim: number;
  tax: Tax11;
  id: number;
  children?: Children20[];
  n_members: number;
  pvalue: number;
  is_contraction?: number;
}

export interface Tax11 {
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
  production_name?: string;
  common_name?: string;
}

export interface Children20 {
  id: number;
  lambda: number;
  name: string;
  n_members: number;
  pvalue: number;
  p_value_lim: number;
  tax: Tax12;
  children?: Children21[];
  is_node_significant?: number;
  is_contraction?: number;
}

export interface Tax12 {
  common_name?: string;
  production_name?: string;
  id: number;
  scientific_name: string;
  timetree_mya: unknown;
}

export interface Children21 {
  lambda: number;
  name: string;
  n_members: number;
  p_value_lim: number;
  tax: Tax13;
  pvalue: number;
  id: number;
  children?: Children22[];
  is_contraction?: number;
  is_node_significant?: number;
}

export interface Tax13 {
  id: number;
  production_name?: string;
  common_name?: string;
  scientific_name: string;
  timetree_mya: unknown;
}

export interface Children22 {
  children?: Children23[];
  id: number;
  pvalue: number;
  n_members: number;
  p_value_lim: number;
  tax: Tax19;
  name: string;
  lambda: number;
  is_contraction?: number;
  is_node_significant?: number;
}

export interface Children23 {
  id: number;
  lambda: number;
  name: string;
  n_members: number;
  pvalue: number;
  p_value_lim: number;
  tax: Tax14;
  children?: Children24[];
  is_contraction?: number;
  is_node_significant?: number;
}

export interface Tax14 {
  timetree_mya: unknown;
  scientific_name: string;
  common_name?: string;
  production_name?: string;
  id: number;
}

export interface Children24 {
  tax: Tax15;
  p_value_lim: number;
  name: string;
  lambda: number;
  is_contraction?: number;
  pvalue: number;
  is_node_significant?: number;
  n_members: number;
  id: number;
  children?: Children25[];
}

export interface Tax15 {
  id: number;
  production_name?: string;
  common_name?: string;
  scientific_name: string;
  timetree_mya: unknown;
}

export interface Children25 {
  p_value_lim: number;
  tax: Tax16;
  pvalue: number;
  lambda: number;
  name: string;
  n_members: number;
  id: number;
  is_contraction?: number;
  is_node_significant?: number;
  children?: Children26[];
}

export interface Tax16 {
  common_name?: string;
  production_name?: string;
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
}

export interface Children26 {
  p_value_lim: number;
  tax: Tax17;
  pvalue: number;
  lambda: number;
  name: string;
  n_members: number;
  id: number;
  children?: Children27[];
}

export interface Tax17 {
  scientific_name: string;
  timetree_mya: unknown;
  production_name?: string;
  common_name?: string;
  id: number;
}

export interface Children27 {
  name: string;
  lambda: number;
  n_members: number;
  tax: Tax18;
  p_value_lim: number;
  pvalue: number;
  id: number;
}

export interface Tax18 {
  scientific_name: string;
  timetree_mya: number;
  production_name: string;
  common_name: string;
  id: number;
}

export interface Tax19 {
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
  common_name?: string;
  production_name?: string;
}

export interface Tax20 {
  scientific_name: string;
  timetree_mya: unknown;
  id: number;
  common_name?: string;
  production_name?: string;
}

export interface Tax21 {
  scientific_name: string;
  timetree_mya: unknown;
  id: number;
  common_name?: string;
  production_name?: string;
}

export interface Tax22 {
  id: number;
  scientific_name: string;
  timetree_mya: unknown;
  common_name?: string;
  production_name?: string;
}

export interface Tax23 {
  timetree_mya: unknown;
  scientific_name: string;
  id: number;
  common_name: string;
  production_name?: string;
}

export interface Tax24 {
  timetree_mya: unknown;
  scientific_name: string;
  id: number;
  common_name: string;
  production_name?: string;
}

export interface Tax25 {
  common_name: string;
  id: number;
  timetree_mya: unknown;
  scientific_name: string;
  production_name?: string;
}

export interface Tax26 {
  timetree_mya: unknown;
  scientific_name: string;
  id: number;
  common_name: string;
  production_name?: string;
}

export interface Tax27 {
  id: number;
  common_name: string;
  scientific_name: string;
  timetree_mya: unknown;
  production_name?: string;
}

export interface Tax28 {
  scientific_name: string;
  timetree_mya: string;
  id: number;
  common_name: string;
}

const get = async () => {
  let loading = true;

  const response = await window.fetch(
    'https://rest.ensembl.org/cafe/genetree/id/ENSGT00390000003602?content-type=application/json',
    {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    }
  );

  let data: Data | undefined;
  let error: Error | undefined;

  if (response.status !== 200) {
    error = new Error(response.status.toString());
  }

  try {
    data = (await response.json()) as Data;

    if (data.error) {
      error = new Error(data.error);
      data = undefined;
    }
  } catch (_error) {
    error = new Error((_error as Error).message);
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

export { get };
