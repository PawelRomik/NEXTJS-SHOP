type AttachmentProps = {
	index: number;
	removeAttachment: (index: number) => void;
	file: File;
};

export default function Attachment({ index, removeAttachment, file }: AttachmentProps) {
	return (
		<li
			key={index}
			className="flex flex-wrap items-center justify-between gap-3 rounded-md border-2 border-red-600 bg-red-600 p-2 text-white"
		>
			<a
				href={URL.createObjectURL(file)}
				download={file.name}
				className="max-w-xs truncate underline"
			>
				{file.name.length > 15 ? `${file.name.slice(0, 15)}...` : file.name}
			</a>
			<button
				type="button"
				onClick={() => removeAttachment(index)}
				className="h-[2rem] w-[2rem] rounded-lg border-2 border-red-700 bg-red-500"
			>
				X
			</button>
		</li>
	);
}
