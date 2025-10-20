import Attachment from "./Attachment";

type FileUploaderProps = {
	onChange: (files: FileList | null) => void;
	attachments: File[];
	removeAttachment: (index: number) => void;
	label: string;
	optionalLabel: string;
};

export function FileUploader({
	onChange,
	attachments,
	removeAttachment,
	label,
	optionalLabel
}: FileUploaderProps) {
	return (
		<div className="flex w-full flex-col  items-start justify-center gap-3 md:mb-4">
			<div className="mb-4 flex w-full flex-col items-center justify-center gap-3 px-3 md:px-0 lg:flex-row">
				<label className=" flex w-full flex-col text-center text-xl font-bold uppercase lg:w-[10rem] lg:text-right">
					{label} <span className="text-base text-gray-300">{optionalLabel}</span>
				</label>
				<input
					type="file"
					multiple
					onChange={(e) => onChange(e.target.files)}
					className="w-full flex-1 rounded-lg bg-white p-3 text-black lg:w-auto"
				/>
			</div>

			{attachments.length > 0 && (
				<ul className="mt-2 flex min-h-[60px] gap-3">
					{attachments.map((file, index) => (
						<Attachment key={index} index={index} file={file} removeAttachment={removeAttachment} />
					))}
				</ul>
			)}
		</div>
	);
}
