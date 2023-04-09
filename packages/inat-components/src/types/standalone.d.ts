interface InitStandaloneProps {
	taxonId: number;
	placeId: number;
}

export type InitStandalone = (id: string, props: InitStandaloneProps) => void;
