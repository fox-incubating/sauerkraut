export as namespace Sauerkraut

export type Config = {
	title: string
	rootDir: string
	contentDir: string
	staticDir: string
	outputDir: string

	transformUri(config: Config, uri: string): string
	validateFrontmatter(config: Config, uri: string, frontmatter: Frontmatter): Frontmatter
	createHtml(
		config: Config,
		object: {
			layout: string
			body: string
			environment: Environment
			title: string
		},
		params?: Record<string, unknown>,
	): string | Promise<string>

	tenHelpers: Record<string, () => string>
}

export type SkFile = {
	Meta?({ config: Config, options: Options }): Promise<TenJsMeta>
	Head?({ config: Config, options: Options }): Promise<TenJsHead>

	GenerateSlugMapping?({
		config: Config,
		options: Options,
	}): Promise<TenJsGenerateSlugMapping>
	GenerateTemplateVariables?(
		arg0: { config: Config; options: Options },
		arg1: Record<PropertyKey, unknown>,
	): Promise<Record<PropertyKey, any>>
}

export type Options = {
	dir: string
	command: 'serve' | 'build' | 'new'
	clean: boolean
	watch: boolean
	verbose: boolean
	positionals: string[]
	env: Environment
}

export type Page = {
	inputFile: string
	inputUri: string
	skFile: SkFile
	parameters: Record<PropertyKey, any>
	outputUri: string
}

export type Frontmatter = {
	title?: string
	author?: string
	date?: string
	layout?: string
	slug?: string
	categories?: string[]
	tags?: string[]
}

export type TenJsMeta = {
	slug?: string
	layout?: string
}

export type TenJsHead = {
	title: string
	content: string
}

export type TenJsGenerateSlugMapping = Array<{
	slug: string
	count: number
}>

type Environment = '' | 'development'
