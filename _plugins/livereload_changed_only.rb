# Without --incremental, `jekyll serve --livereload` sends a reload message for
# every site file on each rebuild (4000+ here), and Safari takes ages to work
# through them. Only send messages for files whose output actually changed.
module LiveReloadChangedOnly
  @fingerprints = {}
  @changed = nil

  class << self
    attr_reader :changed

    def record(site)
      @changed = []
      site.each_site_file do |item|
        fingerprint = item.is_a?(Jekyll::StaticFile) ? File.mtime(item.path) : item.output.hash
        @changed << item.url unless @fingerprints[item.url] == fingerprint
        @fingerprints[item.url] = fingerprint
      end
    end
  end

  def reload(pages)
    changed = LiveReloadChangedOnly.changed
    super(changed ? pages.select { |p| changed.include?(p.url) } : pages)
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  LiveReloadChangedOnly.record(site)

  # The reactor is only loaded by `jekyll serve`, after plugins are.
  if defined?(Jekyll::Commands::Serve::LiveReloadReactor)
    reactor = Jekyll::Commands::Serve::LiveReloadReactor
    reactor.prepend(LiveReloadChangedOnly) unless reactor < LiveReloadChangedOnly
  end
end
